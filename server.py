import http.server
import json
import csv
import os

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                records = json.loads(post_data.decode('utf-8'))
                
                csv_path = 'plantilla_registro_lluvias.csv'
                
                with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                    writer = csv.writer(f)
                    # Write header
                    writer.writerow(['id', 'date', 'department', 'municipality', 'rain', 'lat', 'lng'])
                    # Write rows
                    for idx, r in enumerate(records, start=1):
                        writer.writerow([
                            r.get('id', idx),
                            r.get('date', ''),
                            r.get('department', ''),
                            r.get('municipality', ''),
                            r.get('rain', 0.0),
                            r.get('lat', 0.0),
                            r.get('lng', 0.0)
                        ])
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success', 'count': len(records)}).encode('utf-8'))
                print(f"Successfully auto-saved {len(records)} records to {csv_path}")
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
                print(f"Error saving records: {e}")
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    port = 8081
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, DashboardHandler)
    print(f"Dashboard local server running on port {port}...")
    httpd.serve_forever()
