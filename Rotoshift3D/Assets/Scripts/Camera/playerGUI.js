#pragma strict

var chTexture : Texture2D;
var positionch : Rect;
var ch = true;

var MenuOn = false;
var PauseOn = false;

var keyPress = false;

function Pause()
{
	disableMouse();
	ch = false;
	Time.timeScale = 0;
	PauseOn = true;
}

function unPause()
{
	enableMouse();
	ch = true;
	Time.timeScale = 1;
	PauseOn = false;
}

function Update () 
{	
	if(Input.GetKey(KeyCode.P) == true && keyPress == false)
	{	
		if(PauseOn == false)
		{
			keyPress = true;
			Pause();
		}
		else 
		{
			keyPress = true;
			unPause();
		}
	}
	
	if(Input.GetKey(KeyCode.R) == true)
	{
		if(PauseOn == true)
		{
			unPause();
			var lvl = Application.loadedLevel;
			
			Application.LoadLevel(lvl);
		}
	}	
	
	if(Input.GetKeyUp(KeyCode.P))
	{
		keyPress = false;
	}
	
	
	if(Input.GetKey(KeyCode.Escape))
	{
		if(PauseOn == true)
		{
			unPause();
			Application.LoadLevel(0);
			
		}
	}
	

	positionch = Rect((Screen.width - chTexture.width)/2, (Screen.height - chTexture.height)/2+16, 64, 64);
}

function getMouseState()
{
//	Debug.Log("This is working yo!");

	return MenuOn;
}

function enableMouse()
{
	MenuOn = false;
	Screen.lockCursor = true;
}

function disableMouse()
{
	MenuOn = true;
	Screen.lockCursor = false;
}

function OnGUI()
{		
	if(PauseOn == false)
	{			
		GUI.DrawTexture(positionch, chTexture);
	}
	else
	{
	
		GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 75, 200, 150), "Rotoshift 3D\n\nPaused\n\nPress P to continue...\n\nPress R to reset...\n\nPress Esc to quit...");
		
		/*
		if(GUI.Button(Rect(Camera.main.pixelWidth/2 -50, Camera.main.pixelHeight/2 - 30, 100, 25), "Press P to continue...\n\nPress Esc to quit..."))
		{
			Application.LoadLevel(0);
		}
		if(GUI.Button(Rect(Camera.main.pixelWidth/2 -50, Camera.main.pixelHeight/2 + 20, 100, 25), "Continue"))
		{
			ch = true;
		}*/
	}
}