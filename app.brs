
msgPort = CreateObject("roMessagePort")

node=CreateObject("roNodeJS", "app.js", {})

videoMode = CreateObject("roVideoMode")
resX = videoMode.GetResX()
resY = videoMode.GetResY()
r=CreateObject("roRectangle", 0, 0, resX, resY)

htmlWidget = CreateObject("roHtmlWidget", r)
if type(htmlWidget) = "roHtmlWidget" then
    htmlWidget.StartInspectorServer(2999)
    htmlWidget.SetPort(msgPort)
    htmlWidget.EnableSecurity(false)
    htmlWidget.EnableMouseEvents(true)
    htmlWidget.EnableJavascript(true)
    htmlWidget.AllowJavascriptUrls({ all: "*" })
''    htmlWidget.SetUrl("http://192.168.0.108:3000/index.html")
stop
    htmlWidget.SetUrl("localhost:3000/index.html")
    htmlWidget.Show()
else
    stop
endif

touchScreen = CreateObject("roTouchScreen")
touchScreen.EnableCursor(true)

while true
    msg = wait(0, msgPort)

    if type(msg) = "roHtmlWidgetEvent" then
        msgData = msg.GetData()
        if type(msgData) = "roAssociativeArray" and type(msgData.reason) = "roString" then
            print "reason = "; msgData.reason
            if msgData.reason = "load-error" then
                print "message = " + msgData.message
            else if msgData.reason = "load-finished" then
                htmlWidget.Show()
            else if msgData.reason = "load-started" then
                print "load started"
            endif
        endif
    endif

end while
