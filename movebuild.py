'''
Copy files from React build folder into django's static file structure
'''
import shutil

SRC = 'frontend/'
DST = 'backend/'

shutil.copy(SRC + 'build/index.html', DST + 'templates/index.html')
shutil.rmtree(DST + 'static')
shutil.copytree(SRC + 'build/static', DST + 'static')
