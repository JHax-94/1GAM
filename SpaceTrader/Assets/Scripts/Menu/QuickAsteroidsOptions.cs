using UnityEngine;
using System.Collections;

public class QuickAsteroidsOptions : MonoBehaviour {

	public MenuStyle parentStyle;

	const int menuIndex = 4;

	GUIStyle menuStyle;

	int fieldDensity = 15;
	int fieldLength = 100;
	int HullStrength = 10000;

	void changeStrength(int amount, ref int Strength)
	{
		
		Strength += amount;
		
		if(Strength > 20000)
		{
			Strength = 20000;
		}
		if(Strength < 5000)
		{
			Strength = 5000;
		}
		
	}

	void changeDensity(int amount, ref int Density)
	{
		Density += amount;

		if(Density > 30)
		{
			Density = 30;
		}
		if(Density < 5)
		{
			Density = 5;
		}


	}

	void changeLength(int amount, ref int Length)
	{
		Length += amount;

		if(Length > 250)
		{
			Length = 250;
		}

		if(Length < 50)
		{
			Length = 50;
		}


	}

	void Launch()
	{
		PlayerPrefs.SetString("GameType", "QUICK");
		PlayerPrefs.SetInt ("QuickHull", HullStrength);
		PlayerPrefs.SetInt ("QuickLength", fieldLength);
		PlayerPrefs.SetInt ("QuickDense", fieldDensity);

		Application.LoadLevel("AsteroidField");


	}

	void OnGUI()
	{
		if(GUI.Button (new Rect(20, Screen.height-40, 220, 30), "Back", menuStyle))
		{
			parentStyle.SwitchMenu(menuIndex, -1);
		}
		
		if(GUI.Button (new Rect(Screen.width - 240, Screen.height-40, 220, 30), "Launch", menuStyle))
		{
			Launch ();
		}


		GUI.Label (new Rect(100, Screen.height/2-100, 200f, 30), "FIELD DENSITY", menuStyle);
		GUI.Label (new Rect(100, Screen.height/2-60, 200f, 30f), "FIELD LENGTH", menuStyle);
		GUI.Label (new Rect(100, Screen.height/2-20, 200, 30), "HULL STRENGTH", menuStyle);

		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100, 100f, 30f), fieldDensity.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-60, 100f, 30f), fieldLength.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-20, 100f, 30f), HullStrength.ToString (), menuStyle);

		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100, 40, 30), "<", menuStyle))
		{
			changeDensity(-1, ref fieldDensity);
		}
		if(GUI.Button (new Rect(Screen.width/2-40,  Screen.height/2-60, 40, 30), "<", menuStyle))
		{
			changeLength (-10, ref fieldLength);
		}
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-20, 40, 30), "<", menuStyle))
		{
			changeStrength (-500, ref HullStrength);
		}
		
		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100, 40, 30), ">", menuStyle))
		{
			changeDensity (1, ref fieldDensity);
		}
		if(GUI.Button(new Rect(Screen.width/2+180,  Screen.height/2-60, 40, 30), ">", menuStyle))
		{
			changeLength (10, ref fieldLength);
		}
		
		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-20, 40, 30), ">", menuStyle))
		{
			changeStrength(500, ref HullStrength);
		}






	}
	// Use this for initialization
	void Start () 
	{			
		menuStyle = parentStyle.menuStyle;
		menuStyle.alignment = TextAnchor.MiddleLeft;
		
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
