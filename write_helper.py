import os, base64

def write_b64(path, b64_str):
    d = os.path.dirname(path)
    if d:
        os.makedirs(d, exist_ok=True)
    with open(path, 'wb') as f:
        f.write(base64.b64decode(b64_str))
    print(f'Successfully wrote {path}')
