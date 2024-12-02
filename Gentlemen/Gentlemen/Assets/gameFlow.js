#pragma strict

var player1_Chars : int[];
var player2_Chars : int[];

var player1_Deaths : int = 0;
var player2_Deaths : int = 0;

var player1_Ready : boolean;
var player2_Ready : boolean;

var paceStage : boolean;
var waitStage : boolean;
var Draw : boolean;

var onMark : int = 0;

var player1_Script : characterScript;
var player2_Script : characterScript;

var player1_ForfeitCount : boolean;
var player2_ForfeitCount : boolean;

var player1_Forfeit : float = 3;
var player2_Forfeit : float = 3;

var maxChars : int = 0;

var wait : boolean = false;

var countDown : float = 3;

var overrideGUI : GUIStyle;
var announcerGUI : GUIStyle;

var winner : int = 0;

var keyCharArray : String[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function OnCollisionEnter2D(coll : Collision2D)
{
	if(winner == 0)
	{
		Debug.Log("Dead!");
		wait = true;
		player1_Script.Kill();
		player2_Script.Kill();
		LoadPlayers();
		wait = false;
	}
}

function generateKeys()
{
	Debug.Log("Array length: " + keyCharArray.Length);

	var player1_Num = Mathf.FloorToInt(Random.value*keyCharArray.Length);
	var player2_Num = Mathf.FloorToInt(Random.value*keyCharArray.Length);
	

	
	if(player1_Num == player2_Num)
	{
		player2_Num ++;
		if(player2_Num == keyCharArray.Length)
		{
			player2_Num = player1_Num - 1;
		}
	}	
	
	
	
	Debug.Log("Player 1: " + keyCharArray[player1_Num]);
	Debug.Log("Player 2: " + player2_Num);
				
	player1_Script.Assign(keyCharArray[player1_Num]);
	player2_Script.Assign(keyCharArray[player2_Num]);
}

function Win(player : int)
{
	if(player == 1)
	{
		player2_Script.Kill();
	}
	else
	{
		player1_Script.Kill();
	}
}

function Ready(player : int)
{
	if(player == 1)
	{
		player1_Ready = true;
	}
	else if(player == 2)
	{
		player2_Ready = true;
	}
}

function unReady(player : int)
{
	if(player == 1)
	{
		player1_Ready = false;
	}
	else if(player == 2)
	{
		player2_Ready = false;
	}
}

function Marker()
{
	onMark ++;
}

function offMarker()
{
	onMark --;
	countDown = 3;
}


function Start()
{
	Screen.lockCursor = true;
	maxChars = PlayerPrefs.GetInt("pointsToWin");
		
	player1_Chars = new int[maxChars];
	player2_Chars = new int[maxChars];
	
	for(var i : int = 0; i < maxChars; i ++)
	{
		Debug.Log("Cycle " + i); 
		
		
		player1_Chars[i] = PlayerPrefs.GetInt("player1Char"+i.ToString());
		player2_Chars[i] = PlayerPrefs.GetInt("player2Char"+i.ToString());
	}
	
	LoadPlayers();
	
}

function GetString(ID : int)
{
	var returnName : String;

	switch(ID)
	{
		case 1:
			
			returnName = "Chef";
			
		break;
		
		case 2:
		
			returnName = "Dastard";
		
		break;
		
		case 3: 
			
			returnName = "Debutant";
				
		break;
		
		case 4:
		
			returnName = "Doctor";
			
		break;
		
		case 5:
		
			returnName = "Engineer";
			
		
		break;
		
		case 6:
		
			returnName = "Gentleman";
		
		break;
		
		case 7:
			
			returnName = "Huntress";
			
		break;
		
		case 8:
			
			returnName = "Professor";
			
		break;
		
		case 9:
		
			returnName = "Reverend";
		
		break;
		
		case 10:
		
			returnName = "Rogue";
			
		break;
	}
	return returnName;
}

function LoadPlayers()
{
	onMark = 0;
	paceStage= false;
	waitStage = false;
	Draw = false;

	player1_Forfeit = 3;
	player2_Forfeit = 3;

	var player1String : String = GetString(player1_Chars[player1_Deaths]);
	var player2String : String = GetString(player2_Chars[player2_Deaths]);
	
	var player1Char : GameObject;
	var player2Char : GameObject;
	
	player1Char = Instantiate(Resources.Load(player1String), Vector3(-0.75, 1.5, 0), Quaternion.identity) as GameObject;
	player2Char = Instantiate(Resources.Load(player2String), Vector3(0.75, 1.5, 0), Quaternion.identity) as GameObject;
		
	player1Char.transform.parent = transform;
	player2Char.transform.parent = transform;
	
	player1_Script = player1Char.GetComponent(characterScript);
	player2_Script = player2Char.GetComponent(characterScript);
	
	player1_Script.Player = 1;
	player2_Script.Player = 2;
	player1_Script.SetControlScript();
	player2_Script.SetControlScript();
	player1_Script.Initialise();
	player2_Script.Initialise();
	
	generateKeys();
	
	countDown = Random.value*3+1;
	
}

function LoadScripts () 
{
	var transforms : Transform[];
	transforms = transform.GetComponentsInChildren.<Transform>();
	///Debug.Log(keyCharArray[10]);
	for( var T : Transform in transforms)
	{
		if(T.tag == "Duelist")
		{
			if(T.GetComponent(characterScript).Player == 1)
			{
				player1_Script = T.GetComponent(characterScript);
			}
			else 
			{
				player2_Script = T.GetComponent(characterScript);
			}
		}
	}
	
	generateKeys();
	
}

function Update () 
{
	if(wait != true)
	{
		if(onMark == 2)
		{
			waitStage = true;
			
			if(countDown <= 0)
			{
				Draw = true;
				player1_Script.lockPlayer();
				player2_Script.lockPlayer();
			}
			else
			{
				countDown -= Time.deltaTime;
			}
		}
		else
		{
			if(waitStage == true)
			{
				if(player1_Ready == false)
				{
					
					if(player1_Forfeit > 0)
					{
						player1_Forfeit -= Time.deltaTime;
					}
					else
					{
						player1_Script.locked = true;
						player2_Script.locked = true;
						Shoot(2);
						wait = true;
					}
					
				}
				
				if(player2_Ready == false)
				{
					if(player2_Forfeit > 0)
					{
						player2_Forfeit -= Time.deltaTime;
					}
					else
					{
						player1_Script.locked = true;
						player2_Script.locked = true;
						Shoot(1);
						wait = true;
					}
				}
			}
		}
	}	
	if(winner != 0)
	{
		if(Input.GetKeyDown(KeyCode.Escape))
		{
			Screen.lockCursor = false;
			Application.LoadLevel(0);
		}
		if(Input.GetKeyDown(KeyCode.R))
		{
			Application.LoadLevel(2);
		}
	}
	
}

function Bang()
{
	GetComponent.<AudioSource>().Play();
}

function Shoot(player : int)
{
	Debug.Log("BANG!");
	
	if(player == 1)
	{
		player2_Deaths ++;
		player2_Script.Fall();
		if(player2_Deaths == maxChars)
		{
			wait = true;
			winner = 1;
		}
		
	}
	else if(player == 2)
	{
		player1_Deaths ++;
		player1_Script.Fall();
		if(player1_Deaths == maxChars)
		{
			wait = true;
			winner = 2;
		}
		
		
	}
	
}

function OnGUI()
{
	if(Draw == true)
	{
		GUI.Box(Rect(Screen.width/2 - 30, Screen.height*1/12, 60, 30), "DRAW!", announcerGUI);
		GUI.Box(Rect(160, Screen.height*2/3, 60, 60), player1_Script.fireLetter, overrideGUI);
		GUI.Box(Rect(Screen.width-220, Screen.height*2/3, 60, 60), player2_Script.fireLetter, overrideGUI);
	}
	
	if(waitStage == true)
	{
		if(player1_Ready == false)
		{
			GUI.Box(Rect(Screen.width/9, Screen.height/12, 100, 30), "FORFEIT", announcerGUI);
			GUI.Box(Rect(Screen.width/9, Screen.height/12 + 40, 60, 30), Mathf.Ceil(player1_Forfeit).ToString(), announcerGUI);
		}
		if(player2_Ready == false)
		{
			GUI.Box(Rect(Screen.width*8/9-110, Screen.height/12, 100, 30), "FORFEIT", announcerGUI);
			GUI.Box(Rect(Screen.width*8/9-60, Screen.height/12+40,60, 30), Mathf.Ceil(player2_Forfeit).ToString(), announcerGUI); 
		}
		
		if(player2_Forfeit < 0 || player1_Forfeit < 0)
		{
			GUI.Box(Rect(Screen.width/2 - 30, Screen.height*1/12, 60, 30), "DENIED!", announcerGUI);
		}
	}
	
	if(waitStage == false && Draw == false && paceStage == false)
	{
		GUI.Box(Rect(Screen.width/2 - 30, 20, 60, 30), "ONE HAND BEHIND YOUR BACK!\nREADY!", announcerGUI);
		
		
		
	}
	
	if(winner != 0)
	{
		announcerGUI.fontSize = 20;
		GUI.Box(Rect(Screen.width/2-100, Screen.height/2-60, 200, 120), "Player " + winner +" Wins!\nEscape to return to menu!\nR for rematch!", announcerGUI);
	}
	
	
}	