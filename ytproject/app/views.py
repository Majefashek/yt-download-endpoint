from django.shortcuts import render

# Create your views here.
# views.py
import requests
from django.http import HttpResponse
from pytube import YouTube
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def download_video(request):
    if request.method == 'POST':
        youtube_url = request.POST.get('youtube_url')
        try:
            yt = YouTube(youtube_url)
            stream = yt.streams.get_highest_resolution()
            video_stream = requests.get(stream.url, stream=True)
            response = HttpResponse(video_stream, content_type="video/mp4")
            response['Content-Disposition'] = f'attachment; filename="{yt.title}.mp4"'
            return response
        except Exception as e:
            return HttpResponse(f"Error: {e}", status=400)
    return HttpResponse("Method Not Allowed", status=405)
