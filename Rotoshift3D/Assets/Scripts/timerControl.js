#pragma strict

var timeElapsed : float = 0f;

function Update ()
{
	timeElapsed = Time.timeSinceLevelLoad;
	timeElapsed = Mathf.Floor(timeElapsed * 10)/10;
}

function OnGUI()
{

	var suffix = "";
	if(timeElapsed == Mathf.Floor(timeElapsed))
	{
		suffix = ".0";
	}

	GUI.Box(Rect(10, 10, 150, 25), "Elapsed Time: " + timeElapsed + suffix);

}