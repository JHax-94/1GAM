#pragma strict

enum Face { Top, Bottom, Right, Left, Front, Back };
enum Cube { TL, TC, TR, ML, MC, MR, BL, BC, BR };
enum Orientation { North, East, South, West };

//var CubeArray 
var locked : boolean = true;
var turn : boolean = false;
var flip : boolean = false;
var move : boolean = false;
var flip_dir : int;

var angleTurned : float = 0;
var angular_Vel : float = 10;
var speed : float = 20;

var Height : float = 8;
var Angle : float = 47;

var lockedFace : Face;
var lockedCube : Cube;
var lockedOrientation : Orientation;
var RotationCentre : Vector3 = Vector3(0, 30, 0);

function getOrient()
{
	return lockedOrientation.ToString();
}

function getCubePos(checkCube : Cube)
{
	var pos : Vector2;
	var stringCube : String = checkCube.ToString();
//	Debug.Log("String Cube: " + stringCube);
	
	for(var iter : int = 0; iter < 9; iter ++)
	{
		if(stringCube[0] == "T")
		{
			pos.y = 1;
		}
		else if(stringCube[0] == "M")
		{
			pos.y = 0;
		}
		else if(stringCube[0] == "B")
		{
			pos.y = -1;
		}
		
		if(stringCube[1] == "R")
		{
			pos.x = 1;
		}
		else if(stringCube[1] == "C")
		{
			pos.x = 0;
		}
		else if(stringCube[1] == "L")
		{
			pos.x = -1;
		}	
	}
	
//	Debug.Log("Cube at: (" + pos.x + ", " + pos.y + ")");
	return pos;
}

function lockCubeToPos(newCube : Vector2)
{
	if(newCube.x == -1)
	{
		if(newCube.y == -1)
		{
			lockedCube = Cube.BL;
		}
		else if(newCube.y == 0)
		{
			lockedCube = Cube.ML;
		}
		else if(newCube.y == 1)
		{
			lockedCube = Cube.TL;
		}
	}
	else if(newCube.x == 0)
	{
		if(newCube.y == -1)
		{
			lockedCube = Cube.BC;
		}
		else if(newCube.y == 0)
		{
			lockedCube = Cube.MC;
		}
		else if(newCube.y == 1)
		{
			lockedCube = Cube.TC;
		}
	}
	else if(newCube.x == 1)
	{
		if(newCube.y == -1)
		{
			lockedCube = Cube.BR;
		}
		else if(newCube.y == 0)
		{
			lockedCube = Cube.MR;
		}
		else if(newCube.y == 1)
		{
			lockedCube = Cube.TR;
		}
	}
}

function getPosition()
{
	var i : float;
	var j : float;
	
	var worldVector : Vector3;
	
	var cameraOffset : Vector2;	
	
	var centerPoint : Vector2;
	
// GET OFFSET FROM ORIENTATION
	
	if(lockedOrientation == Orientation.North)
	{
		 cameraOffset = Vector2(0, -12);
	}
	else if(lockedOrientation == Orientation.East)
	{
		cameraOffset = Vector2(-12, 0);
	}
	else if(lockedOrientation == Orientation.South)
	{
		cameraOffset = Vector2(0, 12);
	}
	else if(lockedOrientation == Orientation.West)
	{
	 	cameraOffset = Vector2(12, 0);
	}

// GET CENTER POINT OF CUBE FOCUS

	if(lockedCube == Cube.TL)
	{
		centerPoint = Vector2(-30, 30);					
	}
	else if(lockedCube == Cube.TC)
	{
		centerPoint = Vector2(0, 30);					
	}
	else if(lockedCube == Cube.TR)
	{
		centerPoint = Vector2(30, 30);					
	}
	else if(lockedCube == Cube.ML)
	{
		centerPoint = Vector2(-30, 0);					
	}
	else if(lockedCube == Cube.MC)
	{
		centerPoint = Vector2(0, 0);					
	}
	else if(lockedCube == Cube.MR)
	{
		centerPoint = Vector2(30, 0);					
	}
	else if(lockedCube == Cube.BL)
	{
		centerPoint = Vector2(-30, -30);					
	}
	else if(lockedCube == Cube.BC)
	{
		centerPoint = Vector2(0, -30);
	}
	else if(lockedCube == Cube.BR)
	{	
		centerPoint = Vector2(30, -30);
	}
	
// GET REAL WORLD AXIS FROM FACE

	i = centerPoint.x + cameraOffset.x;
	j = centerPoint.y + cameraOffset.y;

	if(lockedFace == Face.Top)
	{
		worldVector = Vector3(i,40+ Height, j); 	
	}
	else if(lockedFace == Face.Bottom)
	{
		worldVector = Vector3(-i, -(40+ Height), j);
	}	
	else if(lockedFace == Face.Right)
	{
		worldVector = Vector3(40+Height, j, i);
	}
	else if(lockedFace == Face.Left)
	{
		worldVector = Vector3(-(40+Height), j, -i);
	}
	else if(lockedFace == Face.Back)
	{
		worldVector = Vector3(i, j, -(40+Height));
	}
	else if(lockedFace == Face.Front)
	{
		worldVector = Vector3(-i, j, 40+Height);
	}
	
	
	return worldVector;
}

function Turn(dir : String)
{	
	angleTurned = 0;
	turn = true;
	var _orientation : Orientation;
	
	if(dir == "CLOCK")
	{
		if(lockedOrientation == Orientation.North)
		{
			_orientation = Orientation.East;
		}
		else if(lockedOrientation == Orientation.East)
		{
			_orientation = Orientation.South;
		}
		else if(lockedOrientation == Orientation.South)
		{
			_orientation = Orientation.West;
		}
		else if(lockedOrientation == Orientation.West)
		{
			_orientation = Orientation.North;
		}
		
		angular_Vel = 50;		
	}
	else if(dir == "ANTI")
	{
		if(lockedOrientation == Orientation.North)
		{
			_orientation = Orientation.West;
		}
		else if(lockedOrientation == Orientation.East)
		{
			_orientation = Orientation.North;
		}
		else if(lockedOrientation == Orientation.South)
		{
			_orientation = Orientation.East;
		}
		else if(lockedOrientation == Orientation.West)
		{
			_orientation = Orientation.South;
		}
		
		angular_Vel = -50;
	}
	else 
	{
		Debug.Log("Turn direction not recognised");
	}
	
	
	locked = false;
	lockedOrientation = _orientation;
//	return _orientation;
}








function CompassValue()
{
	var Dir : int;
	
	if(lockedOrientation == Orientation.North)
	{
		Dir = 0;
	}
	else if(lockedOrientation == Orientation.East)
	{
		Dir = 1;
	}
	else if(lockedOrientation == Orientation.South)
	{
		Dir = 2;
	}
	else if(lockedOrientation == Orientation.West)
	{
		Dir = 3;
	}
	
	return Dir;
}	


function SetCompass(true_dir : int)
{
	if(true_dir == 0)
	{
		lockedOrientation = Orientation.North;
	}
	else if(true_dir == 1)
	{
		lockedOrientation = Orientation.East;
	}
	else if(true_dir == 2)
	{
		lockedOrientation = Orientation.South;
	}
	else if(true_dir == 3)
	{
		lockedOrientation = Orientation.West;
	}
}




function Flip(true_dir : int, input_dir : int)
{
	var face_Dirs = new Face[4];
	var newCube = new Vector2[4];

	var invert = new String[4];	

	var curCube : Vector2 = getCubePos(lockedCube);
	
//	Debug.Log("Currently at: " + lockedFace.ToString() + ", " + lockedCube.ToString() + "\nFacing: " + lockedOrientation.ToString());
	
	if(lockedFace == Face.Top)
	{
		invert[0] = "SENW";
		invert[1] = "SENW";
		invert[2] = "SENW";
		invert[3] = "SENW";
	
	
		face_Dirs[0] = Face.Front;	
		face_Dirs[1] = Face.Right;
		face_Dirs[2] = Face.Back;
		face_Dirs[3] = Face.Left;
		
		newCube[0] = Vector2(-curCube.x, curCube.y);
		newCube[1] = Vector2(curCube.y, curCube.x);
		newCube[2] = Vector2(curCube.x, -curCube.y);
		newCube[3] = Vector2(-curCube.y, -curCube.x);
	}
	else if(lockedFace == Face.Bottom)
	{	
		invert[0] = "NWSE";
		invert[1] = "NWSE";
		invert[2] = "NWSE";
		invert[3] = "NWSE";
		
		face_Dirs[0] = Face.Front;
		face_Dirs[1] = Face.Left;
		face_Dirs[2] = Face.Back;
		face_Dirs[3] = Face.Right;
		
		newCube[0] = Vector2(curCube.x, -curCube.y);
		newCube[1] = Vector2(-curCube.y, -curCube.x);
		newCube[2] = Vector2(-curCube.x, curCube.y);
		newCube[3] = Vector2(curCube.y, curCube.x);
	}
	else if(lockedFace == Face.Right)
	{
		invert[0] = "WSEN";
		invert[1] = "ENWS";
		invert[2] = "ENWS";
		invert[3] = "WSEN";
	
		face_Dirs[0] = Face.Top;
		face_Dirs[1] = Face.Front;
		face_Dirs[2] = Face.Bottom;
		face_Dirs[3] = Face.Back;
	
		newCube[0] = Vector2(curCube.y, curCube.x);
		newCube[1] = Vector2(-curCube.x, curCube.y);
		newCube[2] = Vector2(curCube.y, curCube.x);
		newCube[3] = Vector2(-curCube.x, curCube.y);	
	}
	else if(lockedFace == Face.Left)
	{
		invert[0] = "ENWS";
		invert[1] = "ENWS";
		invert[2] = "WSEN";
		invert[3] = "WSEN";
	
		face_Dirs[0] = Face.Top;
		face_Dirs[1] = Face.Back;
		face_Dirs[2] = Face.Bottom;
		face_Dirs[3] = Face.Front;
		
		newCube[0] = Vector2(-curCube.y, curCube.x);
		newCube[1] = Vector2(-curCube.x, curCube.y);
		newCube[2] = Vector2(-curCube.y, -curCube.x);
		newCube[3] = Vector2(-curCube.x, curCube.y);	
	}
	else if(lockedFace == Face.Front)
	{
		invert[0] = "SENW";
		invert[1] = "ENWS";
		invert[2] = "SENW";
		invert[3] = "WSEN";	

		face_Dirs[0] = Face.Top;
		face_Dirs[1] = Face.Left;
		face_Dirs[2] = Face.Bottom;
		face_Dirs[3] = Face.Right;
		
		newCube[0] = Vector2(-curCube.x, curCube.y);
		newCube[1] = Vector2(-curCube.x, curCube.y);
		newCube[2] = Vector2(curCube.x, -curCube.y);
		newCube[3] = Vector2(-curCube.x, curCube.y);
	}
	else if(lockedFace == Face.Back)
	{
		invert[0] = "NWSE";
		invert[1] = "ENWS";
		invert[2] = "NWSE";
		invert[3] = "WSEN";
		
		face_Dirs[0] = Face.Top;
		face_Dirs[1] = Face.Right;
		face_Dirs[2] = Face.Bottom;
		face_Dirs[3] = Face.Left;
		
		newCube[0] = Vector2(curCube.x, -curCube.y);
		newCube[1] = Vector2(-curCube.x, curCube.y);
		newCube[2] = Vector2(-curCube.x, curCube.y);
		newCube[3] = Vector2(-curCube.x, curCube.y);
	}
	
	var orient_dir = CompassValue();
	
	//var rotateOrientation = true_dir - orient_dir;
	
		
	var new_orient : int = (input_dir - orient_dir)%4;
//	Debug.Log("New Orientation: " + new_orient);
	
	if(invert[true_dir][input_dir] == "N")
	{
		lockedOrientation = Orientation.North;
	}
	else if(invert[true_dir][input_dir] == "E")
	{
		lockedOrientation = Orientation.East;
	}
	else if(invert[true_dir][input_dir] == "S")
	{
		lockedOrientation = Orientation.South;
	}
	else if(invert[true_dir][input_dir] == "W")
	{
		lockedOrientation = Orientation.West;
	}
	
	
	//SetCompass(new_orient);
	
	
	
	lockedFace = face_Dirs[true_dir];
	
	lockCubeToPos(newCube[true_dir]);
	
//	Debug.Log("Flipping to: " + lockedFace.ToString() + ", " + lockedCube.ToString() + "\nFacing: " + lockedOrientation.ToString());
//	Debug.Log("Flip direction: " + flip_dir);
	//Debug.Log("New Face: " + lockedFace.ToString());
	//Debug.Log("New Cube: " + lockedCube.ToString());
	
	angular_Vel = 50;
	angleTurned = 0;
	
	
	
	
	locked = false;
	flip = true;
}









function Move(dir : String)
{
	
	
	var true_dir = new Array("F", "R", "B", "L");
	
	var flip = new boolean[4];
	
	var go_dir : int;
	var orient_adjust : int;
	
	var input_dir : int;
	
	if(lockedOrientation == Orientation.North)
	{
		orient_adjust = 0;
	}
	else if(lockedOrientation == Orientation.East)
	{
		orient_adjust = 1;
	}
	else if(lockedOrientation == Orientation.South)
	{
		orient_adjust = 2;
	}
	else if(lockedOrientation == Orientation.West)
	{
		orient_adjust = 3;
	}
	
	for(var iter : int = 0; iter < 4; iter ++)
	{
		if(true_dir[iter] == dir)
		{
			go_dir = (iter + orient_adjust) % 4;
			input_dir = iter;
		}
	}
	
	
	var targetCube = new Cube[4];
	
	if(lockedCube == Cube.TL)
	{
		targetCube[0] = Cube.TL;	 
		targetCube[1] =	Cube.TC;
		targetCube[2] =	Cube.ML;
		targetCube[3] =	Cube.TL;
		
		flip[0] = true;
		flip[1] = false;
		flip[2] = false;
		flip[3] = true;
	}
	else if(lockedCube == Cube.TC)
	{
		targetCube[0] = Cube.TC; 
		targetCube[1] =	Cube.TR;
		targetCube[2] =	Cube.MC;
		targetCube[3] =	Cube.TL;
		
		flip[0] = true;
		flip[1] = false;
		flip[2] = false;
		flip[3] = false;
	}
	else if(lockedCube == Cube.TR)
	{
		targetCube[0] = Cube.TR; 
		targetCube[1] =	Cube.TR;
		targetCube[2] =	Cube.MR;
		targetCube[3] =	Cube.TC;
		
		flip[0] = true;
		flip[1] = true;
		flip[2] = false;
		flip[3] = false;
	}
	else if(lockedCube == Cube.ML)
	{
		targetCube[0] = Cube.TL; 
		targetCube[1] =	Cube.MC;
		targetCube[2] =	Cube.BL;
		targetCube[3] =	Cube.ML;
		
		flip[0] = false;
		flip[1] = false;
		flip[2] = false;
		flip[3] = true;
	}
	else if(lockedCube == Cube.MC)
	{
		targetCube[0] = Cube.TC; 
		targetCube[1] =	Cube.MR;
		targetCube[2] =	Cube.BC;
		targetCube[3] =	Cube.ML;
		
		flip[0] = false; 
		flip[1] = false;
		flip[2] = false;
		flip[3] = false;
	}
	else if(lockedCube == Cube.MR)
	{
		targetCube[0] = Cube.TR; 
		targetCube[1] =	Cube.MR;
		targetCube[2] =	Cube.BR;
		targetCube[3] =	Cube.MC;
		
		flip[0] = false; 
		flip[1] = true;
		flip[2] = false;
		flip[3] = false;
		
		
	}
	else if(lockedCube == Cube.BL)
	{
		targetCube[0] = Cube.ML; 
		targetCube[1] =	Cube.BC;
		targetCube[2] =	Cube.BL;
		targetCube[3] =	Cube.BL;
		
		flip[0] = false;
		flip[1] = false;
		flip[2] = true;
		flip[3] = true;
	}
	else if(lockedCube == Cube.BC)
	{
		targetCube[0] = Cube.MC; 
		targetCube[1] =	Cube.BR;
		targetCube[2] =	Cube.BC;
		targetCube[3] =	Cube.BL;
		
		flip[0] = false;
		flip[1] = false;
		flip[2] = true;
		flip[3] = false;
	}
	else if(lockedCube == Cube.BR)
	{
		targetCube[0] = Cube.MR; 
		targetCube[1] =	Cube.BR;
		targetCube[2] =	Cube.BR;
		targetCube[3] =	Cube.BC;
		
		flip[0] = false;
		flip[1] = true;
		flip[2] = true;
		flip[3] = false;
		
	}
	
	if(flip[go_dir] == false)
	{
		lockedCube = targetCube[go_dir];
		move = true;
		locked = false;
	}
	else
	{
		// Good luck...
//		Debug.Log("Go Direction: " + go_dir);
		Flip(go_dir, input_dir);
		flip_dir = input_dir;
	}
	//locked = false;
	
}





function flipCamera()
{
	var rotationAxis : Vector3;
	
	if(flip_dir == 0)
	{
		rotationAxis = transform.right;
	}
	else if(flip_dir == 1)
	{
		rotationAxis = -transform.forward;
	}
	else if(flip_dir == 2)
	{
		rotationAxis = -transform.right;
	}
	else if(flip_dir == 3)
	{
		rotationAxis = transform.forward;
	}
	
	transform.RotateAround(RotationCentre, rotationAxis, angular_Vel*Time.deltaTime);
	angleTurned += Mathf.Abs(angular_Vel)*Time.deltaTime;
	
	
}

function turnCamera()
{
	
	//var controlScript : rotationAxes;
	//controlScript = GetComponent(rotationAxes);
	
	//var axis = controlScript.getUp();
	//var look = transform.forward;
	transform.RotateAround(RotationCentre, transform.up, angular_Vel*Time.deltaTime);
	
	angleTurned += Mathf.Abs(angular_Vel)*Time.deltaTime;
	
	//var toCentre = RotationCentre - transform.position;
	//var rotation = Quaternion.LookRotation();
	//transform.rotation = rotation;
	//transform.Rotate(Vector3(0, 1, 0) * (angular_Vel* Time.deltaTime));
	
	//var rotate = Quaternion.LookRotation(Vector3(-transform.position.x, 0, -transform.position.y), Vector3(0, 1, 0));
	//transform.rotation = rotate;
	//transform.Rotate(0, (Mathf.PI/2)/Time.deltaTime, 0);	
}

function moveCamera()
{
	var movementVec : Vector3;

	if(transform.position != getPosition())
	{
		movementVec = getPosition() - transform.position;
		
		movementVec = movementVec/movementVec.magnitude;
		
		rigidbody.velocity = speed*movementVec;
		
	}
}

function newRotationCenter()
{
	if(lockedCube == Cube.TL)
	{
		RotationCentre = Vector3(-30, 30, 30);
	}
	else if(lockedCube == Cube.TC)
	{
		RotationCentre = Vector3(0, 30, 30);
	}
	else if(lockedCube == Cube.TR)
	{
		RotationCentre = Vector3(30, 30, 30);
	}
	else if(lockedCube == Cube.ML)
	{
		RotationCentre = Vector3(-30, 30, 0);
	}
	else if(lockedCube == Cube.MC)
	{
		RotationCentre = Vector3(0, 30, 0);
	}
	else if(lockedCube == Cube.MR)
	{
		RotationCentre = Vector3(30, 30, 0);
	}
	else if(lockedCube == Cube.BL)
	{
		RotationCentre = Vector3(-30, 30, -30);
	}
	else if(lockedCube == Cube.BC)
	{
		RotationCentre = Vector3(0, 30, -30);
	}
	else if(lockedCube == Cube.BR)
	{
		RotationCentre = Vector3(30, 30, -30);
	}
	
	if(lockedFace == Face.Top)
	{
		RotationCentre = Vector3(RotationCentre.x, RotationCentre.y, RotationCentre.z);
	}
	else if(lockedFace == Face.Bottom)
	{
		RotationCentre = Vector3(-RotationCentre.x, -RotationCentre.y, RotationCentre.z);
	}
	else if(lockedFace == Face.Right)
	{
		RotationCentre = Vector3(RotationCentre.y, RotationCentre.z, RotationCentre.x);
	}
	else if(lockedFace == Face.Left)
	{
		RotationCentre = Vector3(-RotationCentre.y, RotationCentre.z, -RotationCentre.x);
	}
	else if(lockedFace == Face.Front)
	{
		RotationCentre = Vector3(-RotationCentre.x, RotationCentre.z, RotationCentre.y);
	}
	else if(lockedFace == Face.Back)
	{
		RotationCentre = Vector3(RotationCentre.x, RotationCentre.z, -RotationCentre.y);
	}
	
	
	
	
	
}

function lockedPosition()
{
	var shouldLock = true;
	
	var targetPosition = getPosition();
	
	if(Mathf.RoundToInt(transform.position.x) != targetPosition.x)
	{
		shouldLock = false;
	}
	if(Mathf.RoundToInt(transform.position.y) != targetPosition.y)
	{
		shouldLock = false;
	}
	if(Mathf.RoundToInt(transform.position.z) != targetPosition.z)
	{
		shouldLock = false;
	}
	
	
	return shouldLock;
}

function lockedAngle()
{
	var shouldLock = false;
	/*
	if((Mathf.RoundToInt(transform.eulerAngles.y) % 90  < 1 || Mathf.RoundToInt(transform.eulerAngles.y) % 90 > 89) && lockedPosition() == true)
	{
		shouldLock = true;
		angular_Vel = 0;
	}
	*/
	
	if(angleTurned >= 90)
	{
		shouldLock = true;
		angular_Vel = 0;
	}
	
	return shouldLock;
}

function Start()
{
	//transform.RotateAround(Vector3(0, 0, 0), Vector3(0, 1, 0), 20*Time.deltaTime);
	angular_Vel = 0;
	lockedFace = Face.Top;
	lockedCube = Cube.MC;
	lockedOrientation = Orientation.North;
}


function Update () 
{
	if(locked == true)
	{
	
		if(Input.GetKey(KeyCode.Q))
		{
			Turn("CLOCK");		
		}
		else if(Input.GetKey(KeyCode.E))
		{
			Turn("ANTI");			
		}
		else if(Input.GetKey(KeyCode.W))
		{
			//forward
			Move("F");
		}
		else if(Input.GetKey(KeyCode.D))
		{
			//right
			Move("R");
			
		}
		else if(Input.GetKey(KeyCode.S))
		{
			// back
			Move("B");
		}
		else if(Input.GetKey(KeyCode.A))
		{
			// Left
			Move("L");
		}
	}
	else 
	{
		//moveCamera();
		if(lockedAngle() && (turn == true || flip == true))
		{
			transform.position = getPosition();
			var angleMod : int = 1;
			if(transform.eulerAngles.y < 0)
			{
				angleMod = -1;
			}
			
			transform.eulerAngles.x = (Mathf.RoundToInt(transform.eulerAngles.x/90)*90);
			transform.eulerAngles.y = 90*(Mathf.RoundToInt(transform.eulerAngles.y/90));// transform.eulerAngles.y - (angleTurned-90);//-(transform.eulerAngles.y%90);
			transform.eulerAngles.z = (Mathf.RoundToInt(transform.eulerAngles.z/90)*90);


			locked = true;
			turn = false;
			flip = false;
			
		}
		else if(lockedPosition() && move == true)
		{
			
			rigidbody.velocity = Vector3.zero;
			transform.position = getPosition();
			locked = true;
			move = false;
		}
		else
		{
			if(turn == true)
			{
								
				turnCamera();
				
			}
			else if(flip == true)
			{
				flipCamera();
			}
			else if(move == true)
			{
				moveCamera();		
				newRotationCenter();
			}
			else
			{
				locked = true;
			}
		}
	}
	
	//transform.RotateAround(Vector3(0, 0, 0), Vector3(0, 1, 0), 20*Time.deltaTime);	
}

function alignCamera()
{
	var planarCentre : Vector3;
	var adjust : Vector3;
	
	
	if(lockedFace == Face.Top)
	{
		adjust = Vector3(0, 18, 0);
	}
	else if(lockedFace == Face.Bottom)
	{
		adjust = Vector3(0, -18, 0);
//		transform.eulerAngles.z = 180;
	}
	else if(lockedFace == Face.Left)
	{
		adjust = Vector3(-18, 0, 0);
//		transform.eulerAngles.z = 270;
	}
	else if(lockedFace == Face.Right)
	{
		adjust = Vector3(18, 0, 0);
	//	transform.eulerAngles.x = 270;
	//	transform.eulerAngles.y = 270;
		
	}
	else if(lockedFace == Face.Back)
	{
		adjust = Vector3(0, 0, -18);
	}
	else if(lockedFace == Face.Front)
	{
		adjust = Vector3(0, 0, 18);
		
	}
	 
	planarCentre = RotationCentre + adjust;
//	Debug.Log("Planar Centre: " + planarCentre);
	transform.LookAt(planarCentre, adjust);
	
}

function setStartingCamera(cubeCo_ords : Vector3)
{
	var cubeVec : Vector2;

//	Debug.Log("Cube Co-ords: " + cubeCo_ords);

	if(cubeCo_ords.x == 0)
	{
		lockedFace = Face.Top;
		cubeVec.x = cubeCo_ords.y-1;
		cubeVec.y = 1-cubeCo_ords.z;
	}
	else if(cubeCo_ords.x == 1)
	{
		if(cubeCo_ords.y == 0)
		{
			lockedFace = Face.Left;
			cubeVec.x = cubeCo_ords.z-1;
			cubeVec.y = cubeCo_ords.x-1;
		}
		else if(cubeCo_ords.y == 2)
		{
			lockedFace = Face.Right;
			cubeVec.x = 1-cubeCo_ords.z;
			cubeVec.y = cubeCo_ords.x-1;
			
		}
		else if(cubeCo_ords.z == 0)
		{
			lockedFace = Face.Front;
			cubeVec.x = 1-cubeCo_ords.y;
			cubeVec.y = 1-cubeCo_ords.x;
			
			
		}
		else if(cubeCo_ords.z == 2)
		{
			lockedFace = Face.Back;
			cubeVec.x = cubeCo_ords.y-1;
			cubeVec.y = 1-cubeCo_ords.x;
		}
		
	}
	else if(cubeCo_ords.x == 2)
	{
		lockedFace = Face.Bottom;
		cubeVec.x = cubeCo_ords.y-1;
		cubeVec.y = cubeCo_ords.z-1;
	}
	
//	Debug.Log("Converted Co-ords: " + cubeVec);
	
	lockCubeToPos(cubeVec);
	lockedOrientation = Orientation.North;
	transform.position = getPosition();
	newRotationCenter();
	alignCamera();
}





