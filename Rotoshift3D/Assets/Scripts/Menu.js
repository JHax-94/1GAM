#pragma strict

var MenuScreen = 0;
var subMenu = 0;

function Start()
{
	Screen.lockCursor = false;
}

function Update()
{
	if((MenuScreen == 0 || MenuScreen == 3 || MenuScreen == 4) && transform.position.x <= 1 && transform.position.x >= -1)
	{
		GetComponent.<Rigidbody>().position.x = 0;
		GetComponent.<Rigidbody>().velocity.x = 0;
	}
 	if(MenuScreen == 1 && transform.position.x >= 30)
	{
		GetComponent.<Rigidbody>().velocity.x = 0;
		GetComponent.<Rigidbody>().position.x = 30;
	}
	if(MenuScreen == 2 && transform.position.x <= -30)
	{
		GetComponent.<Rigidbody>().velocity.x = 0;
		GetComponent.<Rigidbody>().position.x = -30;
	}
}

function OnGUI () 
{
	
	var scoreScript : scoreControl;
	scoreScript = GetComponent(scoreControl);
	
	switch(MenuScreen)
	{	
		
		
		case 0:
		
			GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 105, 200, 210), "Rotoshift 3D\n\nMain Menu");
			GUI.Label(Rect(Camera.main.pixelWidth/2-90, Camera.main.pixelHeight/2 + 80, 200, 25), "Game by Josh Haxell");
			GUI.Label(Rect(Camera.main.pixelWidth/2-90, Camera.main.pixelHeight/2 + 68, 200, 25), "Made with Unity");
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 - 50, 150, 30), "Level Select"))
			{
				GetComponent.<Rigidbody>().velocity.x = 15;
				MenuScreen = 1;
				subMenu = 0;
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 - 10, 150, 30), "Instructions"))
			{
				GetComponent.<Rigidbody>().velocity.x = -15;
				MenuScreen = 2;
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 + 30, 150, 30), "High Scores"))
			{
				//Application.Quit();
				MenuScreen = 3;
				
			}	
			/*if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 45, Camera.main.pixelHeight/2 + 75, 50, 25), "Quit"))
			{
				Application.Quit();
			}*/
			
		break;
		case 1:
		
			if(subMenu == 0)
			{
				GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 105, 200, 210), "Rotoshift 3D\n\nLevel Select");
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 30, 100, 25), "Level 1"))
				{
					Application.LoadLevel(1);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 5, 100, 25), "Level 2"))
				{
					Application.LoadLevel(2);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 20, 100, 25), "Level 3"))
				{
					Application.LoadLevel(3);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 50, Camera.main.pixelHeight/2 + 45, 25, 25), ">"))
				{
					subMenu = 1;
				}
			}
			else if(subMenu == 1)
			{
				GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 105, 200, 210), "Rotoshift 3D\n\nLevel Select");
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 30, 100, 25), "Level 4"))
				{
					Application.LoadLevel(4);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 5, 100, 25), "Level 5"))
				{
					Application.LoadLevel(5);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 20, 100, 25), "Level 6"))
				{
					Application.LoadLevel(6);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 50, Camera.main.pixelHeight/2 + 45, 25, 25), ">"))
				{
					subMenu = 2;
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 + 45, 25, 25), "<"))
				{
					subMenu = 0;
				}
			}
			else if(subMenu == 2)
			{
				GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 105, 200, 210), "Rotoshift 3D\n\nLevel Select");
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 30, 100, 25), "Level 7"))
				{
					Application.LoadLevel(7);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 5, 100, 25), "Level 8"))
				{
					Application.LoadLevel(8);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 20, 100, 25), "Level 9"))
				{
					Application.LoadLevel(9);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 50, Camera.main.pixelHeight/2 + 45, 25, 25), ">"))
				{
					subMenu = 3;
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 + 45, 25, 25), "<"))
				{
					subMenu = 1;
				}
			}
			else if(subMenu == 3)
			{
				GUI.Box(Rect((Camera.main.pixelWidth)/2 - 100,(Camera.main.pixelHeight)/2 - 105, 200, 210), "Rotoshift 3D\n\nLevel Select");
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 30, 100, 25), "Level 10"))
				{
					Application.LoadLevel(10);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 - 5, 100, 25), "Level 11"))
				{
					Application.LoadLevel(11);
				}
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 20, 100, 25), "Level 12"))
				{
					Application.LoadLevel(12);
				}
				/*if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 50, Camera.main.pixelHeight/2 + 45, 25, 25), ">"))
				{
					subMenu = 2;
				}*/
				if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 75, Camera.main.pixelHeight/2 + 45, 25, 25), "<"))
				{
					subMenu = 2;
				}
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 70, 100, 25), "Back"))
			{
				MenuScreen = 0;
				subMenu = 0;
				GetComponent.<Rigidbody>().velocity.x = -15;
			}
		
		break;
		case 2:
		
			GUI.Box(Rect((Camera.main.pixelWidth)/2 - 250,(Camera.main.pixelHeight)/2 - 150, 500, 300), "Rotoshift 3D\n\nInstructions\n\n");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 - 90, 480, 210), "In Rotoshift 3D your goal is to clear the space of the coloured balls.");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 - 70, 480, 210), "The player ball's movement is affected in different ways by the coloured balls, depending on their colour.");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 - 35, 480, 210), "Red and Blue balls push or pull the player ball in a straight line.");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 - 15, 480, 210), "Green and Purple balls move the player ball in the direction that they are spinning in.");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 + 20, 480, 210), "To clear the board you must change the states of the balls by clicking on them - the faster the better!");
			GUI.Label(Rect((Camera.main.pixelWidth)/2 - 240,(Camera.main.pixelHeight)/2 + 60, 480, 210), "WASD to move\nP to Pause\nMouse to look");
			
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 245, Camera.main.pixelHeight/2 + 120, 300, 25), "Play the original 2D Rotoshift"))
			{
				Application.OpenURL("http://jhaxgames.blogspot.co.uk/p/blog-page.html");
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 145, Camera.main.pixelHeight/2 + 120, 100, 25), "Back"))
			{
				MenuScreen = 0;
				GetComponent.<Rigidbody>().velocity.x = 15;
			}
			
		break;
		
		case 3:
			
			var Pars = new Array(7, 7, 13, 18, 15, 36, 36, 27, 24, 38, 40, 38);
			
			GUI.Box(Rect(Camera.main.pixelWidth/2 - 200, Camera.main.pixelHeight/2 - 200, 400, 400), "Rotoshift 3D\n\nHigh Scores");
			
			var FlevelScores = new float[12];
			var SlevelScores = new String[12];
			
			for(var k = 0; k < 12; k ++)
			{
				FlevelScores[k] = scoreScript.getHighScore(k);
				if(FlevelScores[k] == 0)
				{
					SlevelScores[k] = "-";
				}
				else
				{
					SlevelScores[k] = FlevelScores[k].ToString();
				}
				
			}
			
			for(var i = 0; i < 3; i ++)
			{
				for(var j = 0; j < 4; j ++)
				{
					GUI.Label(Rect(Camera.main.pixelWidth/2 - 150 + (i * 100), Camera.main.pixelHeight/2 - 125 + (j*75), 100, 75), "Level " + (1 + i + j*3) + ":\nFastest: " + SlevelScores[i+j*3] + "\nPar: " + Pars[i+j*3]);
						
				}
			}
			
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 - 50, Camera.main.pixelHeight/2 + 165, 100, 25), "Back"))
			{
				MenuScreen = 0;
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 + 75, Camera.main.pixelHeight/2 + 165, 100, 25), "Reset Scores"))
			{
			
				MenuScreen = 4;
				
			}
			
		break;
		case 4:
		
			GUI.Box(Rect(Camera.main.pixelWidth/2 - 55, Camera.main.pixelHeight/2 - 40, 110, 80), "Reset Scores\nAre you sure?");
		
			if(GUI.Button(Rect(Camera.main.pixelWidth/2 -50 , Camera.main.pixelHeight/2, 50, 35), "No"))
			{
				MenuScreen = 3;
			}
			if(GUI.Button(Rect(Camera.main.pixelWidth/2, Camera.main.pixelHeight/2, 50, 35), "Yes"))
			{
				for(var L : int = 0; L < 12; L ++)
				{
					scoreScript.setHighScore(L, 0);
				}
				MenuScreen = 3;
			}
			
		break;
		
		default:
			
			Debug.Log("You done fucked up boi!");
			
		break;
			
			
	}

}