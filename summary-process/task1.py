import yt_dlp

def download_video_as_mp3(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': "C:/Users/sw000/vidie-audie/summary-process/contents/" + '%(title)s.%(ext)s',
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


down_url = input('url을 입력하세요 : ')
download_video_as_mp3(down_url)