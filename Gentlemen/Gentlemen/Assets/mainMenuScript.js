#pragma strict

var menuGUI : GUIStyle;
var subMenuGUI : GUIStyle;
var menuScreen : int = 0;

var schemeInt : int = 0;
var schemeStrings : String[] = ["Mouse", "Flipped Mouse"];

var pointsInt : int = 2;
var pointsStrings : String[] = ["1", "2", "3", "4", "5"];

var left : boolean = false;
var right : boolean = false;



var player1Ready : String;
var player2Ready : String;

function Start () 
{
	if(PlayerPrefs.HasKey("pointsToWin") != true)
	{
		PlayerPrefs.SetInt("pointsToWin", 1);
		 
	}
	else
	{
		pointsInt = PlayerPrefs.GetInt("pointsToWin");
	}
	if(PlayerPrefs.HasKey("controlScheme") != true)
	{
		PlayerPrefs.SetInt("controlScheme", 0);
	} 
	else 
	{
		schemeInt = PlayerPrefs.GetInt("controlScheme");
	}
	
	PlayerPrefs.Save();
}


function Update () 
{
	
	/*
	
	if(Input.GetButton("SCHEME_2_P1_READY"))
	{
		left = true;
	}
	else// if(Input.GetButtonUp("SCHEME_2_P1_READY"))
	{
		left = false;
	}
	
	
	if(Input.GetButtonUp("SCHEME_2_P1_READY"))
	{
		Debug.Log("P1 UP");
	}
	
	
	if(Input.GetButton("SCHEME_2_P2_READY"))
	{
		right = true;
	}
	else// if(Input.GetButtonUp("SCHEME_2_P2_READY"))
	{
		right = false;
	}
	
	if(Input.GetButtonUp("SCHEME_2_P2_READY"))
	{
		Debug.Log("P2_UP");
	}
	
	if(right == true && left == true)
	{
		Debug.Log("Both");
		
	}
	else if(right) Debug.Log("Right");
	else if(left) Debug.Log("Left");


	*/
	if(Input.GetKey(KeyCode.Escape))
	{
		Application.Quit();
	}
}

function OnGUI()
{

	menuGUI.fontSize = 12;
	GUI.Label(Rect(Screen.width/2-60, Screen.height-45, 120, 30), char.ConvertFromUtf32(169).ToString() +  " Josh Haxell 2014", menuGUI);
	menuGUI.fontSize = 30;
	
	//GUI.Box(Rect(Screen.width/2 - 100, Screen.height/2+25, 200, 50), "BOOBS!");
	switch(menuScreen)
	{
		case 0:
		
			if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height/2+25, 200, 50), "START", menuGUI))
			{
				Debug.Log("New Game!");
				menuScreen = 1;
			}
			
			if(GUI.Button(Rect(Screen.width/6 -150 , Screen.height*8/9-30, 300, 50), "SETTINGS", menuGUI))
			{
				Debug.Log("Settings");
				
				menuScreen = 2;
			}
			
			if(GUI.Button(Rect(Screen.width*5/6-150, Screen.height*8/9-30, 300, 50), "CREDITS", menuGUI))
			{
				Debug.Log("Credits");
				
				menuScreen = 3;
			} 
			
		break;
		
		case 1:
			
			subMenuGUI.fontSize = 30;
			
			GUI.Box(Rect(Screen.width/2-200, Screen.height/2-250, 400, 500), "POINTS TO WIN", subMenuGUI);
			
			pointsInt = GUI.SelectionGrid(Rect(Screen.width/2-200, Screen.height/2-150, 400, 300), pointsInt, pointsStrings, 1, subMenuGUI);
	 		
	 		if(GUI.Button(Rect(Screen.width/2-200, Screen.height/2+200, 400, 40), "GO!", subMenuGUI))
	 		{
	 			Debug.Log("Character Select!");
	 			
	 			PlayerPrefs.SetInt("pointsToWin", (pointsInt)+1);
	 			PlayerPrefs.Save();
	 			
	 			Application.LoadLevel(1);
	 		}
		
			if(GUI.Button(Rect(Screen.width*5/6-150, Screen.height*8/9, 300, 50), "BACK", menuGUI))
			{
				menuScreen = 0;
			}
			
			
		break;
		
		case 2:
			
			//menuGUI.normal.background = menuGUI.hover.background;
			//menuGUI.alignment = menuGUI.alignment.value
			
			GUI.Box(Rect(Screen.width/6, Screen.height/2-150, Screen.width*2/3, 300), "SETTINGS", subMenuGUI);
			GUI.Label(Rect(Screen.width/4+50, Screen.height/2-100, 100, 50), "CONTROLS: ", subMenuGUI);
			
			subMenuGUI.fontSize = 12;
	
			
			schemeInt = GUI.SelectionGrid(Rect( Screen.width/6, Screen.height/2-50, Screen.width*2/3,  30), schemeInt, schemeStrings, 2, subMenuGUI);
			
			
			switch(schemeInt)
			{
				case 0:
				
					player1Ready = "LEFT CLICK";
					player2Ready = "RIGHT CLICK";
					
					GUI.Label(Rect(Screen.width/6, Screen.height*3/5, Screen.width*2/3, 50), "Best for laptop tracker pads.", subMenuGUI);
					
				break;	
				
				case 1:
					
					player1Ready = "RIGHT CLICK";
					player2Ready = "LEFT CLICK";
					
					GUI.Label(Rect(Screen.width/6, Screen.height*3/5, Screen.width*2/3, 50), "Best for normal mice (turn it around though).", subMenuGUI);
					
				break;
				/*
				case 2:
					
					player1Ready = "LEFT SHIFT";
					player2Ready = "RIGHT SHIFT";
					
					GUI.Label(Rect(Screen.width/6, Screen.height*3/5, Screen.width*2/3, 50), "Best for if you don't have a mouse, or if \nyou have a very slippy mouse.", subMenuGUI);
					
				break;
				*/

			}
			
			
			GUI.Label(Rect(Screen.width/5, Screen.height/4+150, Screen.width/4, 40), "PLAYER 1:\nREADY - " + player1Ready, subMenuGUI);
			GUI.Label(Rect(Screen.width/2, Screen.height/4+150, Screen.width/4, 40), "PLAYER 2:\nREADY - " + player2Ready, subMenuGUI);
			
			
			subMenuGUI.fontSize = 30;
			
			
			//menuGUI.normal.background = null;
			
			
			if(GUI.Button(Rect(Screen.width/12, Screen.height*8/9-30, 300, 50), "APPLY", menuGUI))
			{
				//DO APPLY STUFF
				PlayerPrefs.SetInt("controlScheme", schemeInt);
				PlayerPrefs.Save();
				menuScreen = 0;
			}
			
			if(GUI.Button(Rect(Screen.width*5/6-150, Screen.height*8/9-30, 300, 50), "BACK", menuGUI))
			{
				menuScreen = 0;
			}
			
		break;
		
		
		case 3:
			menuGUI.fontSize = 15;
			GUI.Label(Rect(Screen.width/2-300, Screen.height/2+200, 600, 200), "Game and Art - Josh Haxell (@Hacksaw79)\nFont - Press Start 2P from Google Fonts (CodeMan38)\nMade with Unity", menuGUI);
			
			menuGUI.fontSize = 30;
			
			if(GUI.Button(Rect(Screen.width*5/6-150, Screen.height * 8/9, 300, 50), "BACK", menuGUI))
			{
				menuScreen = 0;
			}
			
			
			
			
		break;
		
	}
}