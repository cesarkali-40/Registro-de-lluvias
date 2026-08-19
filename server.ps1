$port = 8081
$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:$port/")
$http.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $http.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Servidor Pluviometrico corriendo en:" -ForegroundColor Cyan
    Write-Host "  -> http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "  -> http://127.0.0.1:$port/" -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Green
} catch {
    Write-Host "Error iniciando el servidor en puerto ${port}: $_" -ForegroundColor Red
    exit 1
}

while ($http.IsListening) {
    try {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "POST" -and $request.Url.LocalPath -eq "/api/save") {
            try {
                $reader = [System.IO.StreamReader]::new($request.InputStream, $request.ContentEncoding)
                $body = $reader.ReadToEnd()
                $reader.Close()

                $records = ConvertFrom-Json $body
                $csvPath = Join-Path (Get-Location) "plantilla_registro_lluvias.csv"

                $csvLines = [System.Collections.Generic.List[string]]::new()
                $csvLines.Add("id,date,department,municipality,rain,lat,lng")

                $idx = 1
                foreach ($r in $records) {
                    $id = if ($r.id) { $r.id } else { $idx }
                    $date = if ($r.date) { $r.date } else { "" }
                    $dept = if ($r.department) { '"' + $r.department.Replace('"', '""') + '"' } else { '""' }
                    $mun = if ($r.municipality) { '"' + $r.municipality.Replace('"', '""') + '"' } else { '""' }
                    $rain = if ($null -ne $r.rain) { $r.rain } else { 0 }
                    $lat = if ($null -ne $r.lat) { $r.lat } else { 0 }
                    $lng = if ($null -ne $r.lng) { $r.lng } else { 0 }

                    $csvLines.Add("$id,$date,$dept,$mun,$rain,$lat,$lng")
                    $idx++
                }

                $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
                [System.IO.File]::WriteAllLines($csvPath, $csvLines, $utf8NoBom)

                $resBytes = [System.Text.Encoding]::UTF8.GetBytes('{"status":"success"}')
                $response.ContentType = "application/json"
                $response.StatusCode = 200
                $response.ContentLength64 = $resBytes.Length
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            } catch {
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("{""error"":""$($_ -replace '"','\"')""}")
                $response.ContentType = "application/json"
                $response.StatusCode = 500
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $localPath = Join-Path (Get-Location) $path.TrimStart('/')
        
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            
            if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($localPath.EndsWith(".js")) { $response.ContentType = "application/javascript; charset=utf-8" }
            elseif ($localPath.EndsWith(".json")) { $response.ContentType = "application/json" }
            elseif ($localPath.EndsWith(".csv")) { $response.ContentType = "text/csv; charset=utf-8" }
            elseif ($localPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($localPath.EndsWith(".jpg") -or $localPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($localPath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            else { $response.ContentType = "application/octet-stream" }
            
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {
        # Continue on client abort
    }
}
