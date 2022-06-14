#pragma strict

var menuScreen : int = 0;
var waterCoverage : float = 60.0f;
var tutorialOn : boolean = true;
var villagerStats = new float[2, 7];
var statString = new Array("Aggression", "Amorousness", "Charisma", "Curiosity", "Industriousness", "Organisation");

var subMenu : int = 0;

function totalStats(col : int)
{
	var total : int = 0;
	
	for(var iter : int = 0; iter < 6; iter ++)
	{
		total += villagerStats[col, iter];
	}
	
	return total;
}


function Start()
{
	Time.timeScale = 1;
	villagerStats[0, 6] = 16;
	villagerStats[1, 6] = 16; 
}

function Update () 
{
	transform.RotateAround(Vector3.zero, Vector3.up, 20*Time.deltaTime);
}
/*
function OnGUI()
{
	switch(menuScreen)
	{
		case 0: 
			
			GUI.Box(Rect(Screen.width/2 - 150, Screen.height/2 - 100, 300, 200), "Lantern\nMain Menu");
			
			GUI.Label(Rect(Screen.width/2 -145, Screen.height/2 + 65, 300, 25), "Made with Unity");
			GUI.Label(Rect(Screen.width/2 -145, Screen.height/2 + 80, 300, 25), "Game by Josh Haxell");
			GUI.Label(Rect(Screen.width/2 + 110, Screen.height/2 + 80, 100, 25), "v1.0.5");
			if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height/2 - 30, 200, 25), "Start Game"))
			{
				Debug.Log("Start Game");
				menuScreen = 1;
			}
			else if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height/2, 200, 25), "About"))
			{
				Debug.Log("About");
				menuScreen = 3;
			}
			else if(GUI.Button(Rect(Screen.width/2-100, Screen.height/2 + 30, 200, 25), "Quit"))
			{
				Application.Quit();
			}
		
			
			/*else if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height/2 + 30, 200, 25), "About"))
			{
				Debug.Log("About");
			}*/
/*	
		break;
		
		case 1:
		
			GUI.Box(Rect(Screen.width/2 - 150, Screen.height/2 - 100, 300, 200), "Lantern\nNew Game\nCreate World");
			
			GUI.Label(Rect(Screen.width/2 - 140, Screen.height/2 -30, 200, 25), "Water coverage: ");
			GUI.Label(Rect(Screen.width/2 -20, Screen.height/2-30, 200, 25), Mathf.RoundToInt(waterCoverage).ToString() + "%");
			waterCoverage = GUI.HorizontalSlider(Rect(Screen.width/2 - 100, Screen.height/2 , 200, 30), waterCoverage, 30.0, 80.0);
			
			GUI.Label(Rect(Screen.width/2 - 140, Screen.height/2+25,  280, 25), "Lower water coverage results in an easier game.");
			//tutorialOn = GUI.Toggle(Rect(Screen.width/2 -75, Screen.height/2+25, 200, 30), tutorialOn,  "On");
			
			if(GUI.Button(Rect(Screen.width/2 + 95, Screen.height/2 + 70, 50, 25), "Next"))
			{
				Debug.Log("Next");
				menuScreen = 2;
			}
			else if(GUI.Button(Rect(Screen.width/2 - 145, Screen.height/2 + 70, 50, 25), "Back"))
			{
				Debug.Log("Back");
				menuScreen = 0;
			}
		break;
		
		case 2:
			GUI.Box(Rect(Screen.width/2 - 200, Screen.height/2 - 200, 400, 400), "Lantern\nNew Game\nCreate your first villagers!");
			
			for(var i : int = 0; i < 2; i ++)
			{
				var _x : int;
				
				if(i == 0)
				{
					_x = Screen.width/2 - 100;
				}	
				else if(i == 1)
				{
					_x = Screen.width/2 + 100;
				}
				
				GUI.Label(Rect(_x+25, Screen.height/2 - 80, 150, 30), "Villager " + (i+1));
				
				for(var j : int = 0; j < 6; j ++)
				{
					GUI.Label(Rect(_x - 85, Screen.height/2-55 + j*30, 100, 30), statString[j].ToString());
					villagerStats[i, j] = Mathf.RoundToInt(GUI.HorizontalSlider(Rect(_x+15, Screen.height/2-50 + j*30, 75, 30), villagerStats[i, j], 0.0, 10.0));
				}
				GUI.Label(Rect(_x - 85, Screen.height/2 + 120, 200, 30), "Points left:     " + (villagerStats[i, 6] - totalStats(i)));
			}
			if(totalStats(0) > 16 || totalStats(1) > 16)
			{
				GUI.Box(Rect(Screen.width/2 - 200, Screen.height/2 + 200, 400, 25), "Points left must be 0 or higher!");
			}
			if(GUI.Button(Rect(Screen.width/2 + 145, Screen.height/2 + 170, 50, 25), "Next"))
			{
				
				if(totalStats(0) > 16 || totalStats(1) > 16)
				{
					
					Debug.Log("Error!");
					
				}
				else
				{
					//Debug.Log("Next");
					PlayerPrefs.SetFloat("Water Perc", waterCoverage);
					for(var col : int = 0; col < 2; col ++)
					{
						for(var row : int = 0; row < 6; row ++)
						{
							//Debug.Log("Saving " + villagerStats[col, row] + " to Villager"+(col+1)+statString[row]);
						
							PlayerPrefs.SetFloat("Villager"+(col+1)+statString[row], villagerStats[col, row]); 
						}
					}				
					
					Application.LoadLevel(1);
					
				//menuScreen = 2;
				}
			}
			else if(GUI.Button(Rect(Screen.width/2 - 195, Screen.height/2 + 170, 50, 25), "Back"))
			{
				Debug.Log("Back");
				menuScreen = 1;
			}
		break;	
		
		case 3:
		
			switch(subMenu)
			{
			
			case 0:
			
				GUI.Box(Rect(Screen.width/2-200, Screen.height/2 - 200, 400, 400), "About");
				
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2-175, 380, 50), "The goal of Lantern is to guide the inhabitants of a world towards enlightenment by helping them to explore their home and develop their society.");
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2-120, 380, 100), "To do this, you must influence their growth by handing commandments down in the form of books and creating mystical artifacts. This gives villagers traits which are then passed onto the next generation.");
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2-50, 380, 40), "The behaviour of villagers can also be adjusted by imbuing them with mystical spirits.");
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2-15, 380, 100), "To help villagers explore you must guide them to build a tower at the edge of their current cube. To do this, switch on your presence and hover over an edge.");
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2+40, 380, 100), "This game is largely about experimentation so if things don't go too well with the initial traits you set the first time, try something else!\nIf you have any questions or find a bug feel free to send an email to jhaxgames@gmail.com or find the developer on Twitter @Hacksaw79");
				
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2 + 135, 380, 100), "Spirits: \nRed - Love: Makes a villager want to breed.\nGreen - Wanderlust: Makes a villager leave its home, if it can.\nBlue - Peace: Reduces a villager's aggression.");
				
				
				
				if(GUI.Button(Rect(Screen.width/2 - 200, Screen.height/2 + 200, 50, 25), "Back"))
				{
					Debug.Log("Back");
					menuScreen = 0;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 140, Screen.height/2 + 200, 60, 25), "Controls"))
				{
					subMenu = 1;
				}
			
				
			break;
			
			case 1:
				
				GUI.Box(Rect(Screen.width/2 - 200, Screen.height/2 -200, 400, 400), "Controls");
				
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 -175, 380, 30), "WASD - Navigate the world          QE - Rotate view");
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 -145, 380, 30), "Left Shift/Click Mouse Wheel - Switch Presence On/Off");
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 - 115, 380, 30), "Scroll Mouse Wheel/(1 - 4) - Change spirit");
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 - 85, 380, 30), "Click - Place Spirit");
				
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 - 55, 380, 30), "Space - Bring up Book/Artifact Menu");
				GUI.Label(Rect(Screen.width/2 - 195, Screen.height/2 - 25, 380, 30), "C - Place Book          V - Place Artifact");
				
				
				GUI.Label(Rect(Screen.width/2-195, Screen.height/2+5, 380, 30), "P/Escape - Pause");
				if(GUI.Button(Rect(Screen.width/2 - 200, Screen.height/2 + 200, 100, 25), "Main Menu"))
				{
					Debug.Log("Back");
					menuScreen = 0;
					subMenu = 0;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 150, Screen.height/2 + 200, 50, 25), "Back"))
				{
					subMenu = 0;
				}
			
			break;
			}
		break;
	}
	
}*/

