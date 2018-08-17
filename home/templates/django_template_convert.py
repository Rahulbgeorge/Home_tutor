#solving for links
html_file=open("student.html","r")
content=html_file.read()
bracket_end=0
while(True):
    try:
        index=content.index("link",bracket_end)
        href=content.index("href",index)
        bracket=content.index("\"",href)
        bracket_end=content.index("\"",bracket+1)
        loc=content[bracket+1:bracket_end]
        print(loc)
        #modifying content
        loc="{%static \'"+loc+"\' %}"
        first_half=content[:bracket+1]
        last_half=content[bracket_end:]
        content=first_half+loc+last_half
    except:
        break

#program for solving img
bracket_end=0
while(True):
    try:
        index=content.index("img",bracket_end)
        href=content.index("src",index)
        bracket=content.index("\"",href)
        bracket_end=content.index("\"",bracket+1)
        loc=content[bracket+1:bracket_end]
        print(loc)
        #modifying content
        loc="{%static \'"+loc+"\' %}"
        first_half=content[:bracket+1]
        last_half=content[bracket_end:]
        content=first_half+loc+last_half
    except:
        break

bracket_end=0
#program for solving scripts
while(True):
    try:
        index=content.index("script",bracket_end)
        href=content.index("src",index)
        bracket=content.index("\"",href)
        bracket_end=content.index("\"",bracket+1)
        loc=content[bracket+1:bracket_end]
        print(loc)
        #modifying content
        loc="{%static \'"+loc+"\' %}"
        first_half=content[:bracket+1]
        last_half=content[bracket_end:]
        content=first_half+loc+last_half
    except:
        break


    
    
    
    
out=open("output.html","w")
out.write(content)

