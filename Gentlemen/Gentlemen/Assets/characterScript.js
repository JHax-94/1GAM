#pragma strict
#pragma downcast

var Idle : Sprite;
var Ready : Sprite;
var Right : Sprite;
var Left : Sprite;
var Fire : Sprite;

var Player : int;

var legDelay : float = 0.1;
var legTime : float = legDelay;

var moveSpeed : float = 2;

var spriteControl : SpriteRenderer;

var fireButton : KeyCode;
var fireLetter : String;

var readyState : boolean = true;
var Moving : boolean = false;
var Marker : boolean = false;
var locked : boolean = false;
var NoFire : boolean = false;

var buttonHeld : boolean = false;

var distTravelled : float = 0;

var readyButton : int;
var readyKey : KeyCode;

var controlScript : gameFlow;
var controlScheme : int;

var holdString : String[] = ["Left Click", "Right Click", "Left Shift", "Right Click", "Left Click", "Right Shift", "Hold"];
var textBox_X : int;

var dispString : String;

var initialised : boolean = false;

var characterGUI : GUIStyle;

function Kill()
{
	Destroy(gameObject);
}

function Fall()
{
	NoFire = true;
	GetComponent.<Rigidbody2D>().gravityScale = 1;
	if(Player == 1)
	{	
		GetComponent.<Rigidbody2D>().AddTorque(6);
	}
	else
	{
		GetComponent.<Rigidbody2D>().AddTorque(-6);
	}
}

function Assign(represent : String)
{
	fireButton = KeyCode.Parse(KeyCode, represent);
	fireLetter = represent;
}

function changeLeg()
{
	if(spriteControl.sprite == Right)
	{
		spriteControl.sprite = Left;
	}
	else if(spriteControl.sprite == Left)
	{
		spriteControl.sprite = Right;
	}
	
}

function lockPlayer()
{
	locked = true;
} 

function Initialise () 
{
	spriteControl = GetComponent(SpriteRenderer) as SpriteRenderer;
	
	controlScheme = PlayerPrefs.GetInt("controlScheme");
	
	if(Player == 1)
	{
		transform.localScale.x = -1*transform.localScale.x;
		moveSpeed = -1*moveSpeed;
		
		if(controlScheme == 0)
		{
			readyButton = 0;
		}
		else if(controlScheme == 1)
		{
			readyButton = 1;
		}
		else if(controlScheme == 2)
		{
			readyKey = KeyCode.LeftShift;
		}
	}
	else if(Player == 2)
	{
		
		if(controlScheme == 0)
		{
			readyButton = 1;
		}
		else if(controlScheme == 1)
		{
			readyButton = 0;
		}
		else if(controlScheme == 2)
		{
			readyKey = KeyCode.RightShift;
		}
	}
	
	spriteControl.sprite = Idle;
	
	if(Player == 1)
	{
		textBox_X = 100;
	}
	else if(Player == 2)
	{
		textBox_X = Screen.width-280;
	}
	
	characterGUI = controlScript.overrideGUI;
	characterGUI.fontSize = 15;
	characterGUI.fontStyle = FontStyle.Normal;
	
	initialised = true;
	//Debug.Log(transform.parent.name + " is my parent!");
	
	//controlScript = transform.parent.GetComponent(gameFlow);
}

function SetControlScript()
{
	controlScript = transform.parent.GetComponent(gameFlow);
}

function Update () 
{
	

	if(Moving == true)
	{
		legTime -= Time.deltaTime;
		distTravelled += Time.deltaTime*moveSpeed;
		if(Mathf.Abs(distTravelled) >= 3.6)
		{
			GetComponent.<Rigidbody2D>().velocity.x = 0;
			Moving = false;
			spriteControl.sprite = Ready;
			Marker = true;
			controlScript.Ready(Player);
			controlScript.Marker();
		}
		
		
		if(legTime <= 0)
		{
			legTime = legDelay;
			
			changeLeg();
			
		}
	}
	
	
	
	
	
	if((controlScheme != 2 && Input.GetMouseButtonDown(readyButton)) || (controlScheme == 2 && Input.GetKeyDown(readyKey)))
	{
		controlScript.paceStage = true;
		buttonHeld = true;
		if(Marker == false && Moving == false)
		{
			spriteControl.sprite = Right;
			GetComponent.<Rigidbody2D>().velocity.x = moveSpeed;
			Moving = true;
		}
		if(Marker == true)
		{
			if(spriteControl.sprite != Ready)
			{
				
				spriteControl.sprite = Ready;
				controlScript.Ready(Player);
				controlScript.Marker();
			}
		}
	}
	
	if(Input.GetKeyDown(readyKey))
	{
		Debug.Log("Player" + Player + "Ready key down");
	}
	else 
	{
		Debug.Log("Player" + Player + "Ready key up");
	}
	
	
	if(Input.GetKeyUp(readyKey))
	{
		Debug.Log("Player " + Player + " key up!"); 
	}
	
	
	if(((controlScheme != 2 && Input.GetMouseButtonUp(readyButton)) || (controlScheme == 2 && Input.GetKeyUp(readyKey))) && locked == false)
	{
		
	
		spriteControl.sprite = Idle;
		buttonHeld = false;
		
		GetComponent.<Rigidbody2D>().velocity.x = 0;
		
		if(Marker == true)
		{
			controlScript.unReady(Player);
			controlScript.offMarker();
		}
		
		Moving = false;
	}
	
	if(locked == true)
	{
		if(Input.GetKeyDown(fireButton) && NoFire == false)
		{	
			NoFire = true;
			spriteControl.sprite = Fire;
			controlScript.Shoot(Player);
			controlScript.Bang();
			
		}
	}
	
}


function OnGUI()
{
	if(initialised == true && locked == false)
	{
		if(buttonHeld == true)
		{
			dispString = holdString[6];	
		}
		else
		{
			dispString = holdString[(Player-1)*3+controlScheme];
		}
		
		GUI.Box(Rect(textBox_X, Screen.height-100, 180, 60), dispString, controlScript.overrideGUI);
	}
}