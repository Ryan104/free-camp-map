import sys, shutil

src = sys.argv[1]
dst = sys.argv[2]

shutil.copy(src + 'build/index.html', dst + 'templates/index.html')
shutil.rmtree(dst + 'static')
shutil.copytree(src + 'build/static', dst + 'static')