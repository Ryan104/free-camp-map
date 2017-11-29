from django.shortcuts import render

def serve_react(request):
    return render(request, 'index.html')
