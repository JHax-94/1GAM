using UnityEngine;
using System.Collections;

public class QuickDropOptions : MonoBehaviour {

	public MenuStyle parentStyle;

	const int menuIndex = 2;

	string backString;
	string launchString;

	string[] settings = {"Height: ", "Max Windspeed: ", "Fuel: ", "Hull Strength: "};

	int Height = 100;
	int MaxWind = 0;
	int Fuel = 1000;
	int HullStrength = 100;

	int grIndex;

	GUIStyle menuStyle;

	int BoxSize;



	bool Rest = true;
	bool X_Rest = true;

	void Launch()
	{
		PlayerPrefs.SetInt("Drop_Height", Height);
		PlayerPrefs.SetInt ("Max_Wind", MaxWind);
		PlayerPrefs.SetInt ("Fuel", Fuel);
		PlayerPrefs.SetInt ("Hull", HullStrength);
		PlayerPrefs.SetString ("GameType", "QUICK");

		Debug.Log ("Go for launch!");
		Application.LoadLevel("DropMode");
	}







	void shiftGridIndex(int shiftBy)
	{
		if(grIndex+shiftBy == settings.Length)
		{
			grIndex = 0;
		}
		else if(grIndex+shiftBy < 0)
		{
			grIndex = settings.Length-1;
		}
		else
		{
			grIndex += shiftBy;
		}
	}

	void IncrementHeight(int Dir)
	{
		if(Height + Dir*50 <= 1000 && Height+Dir*50 >= 50)
		{
			Height = Height+Dir*50;
		}
	}

	void IncrementMaxWind(int Dir)
	{
		if(MaxWind+10*Dir <= 100 && MaxWind+10*Dir >= 0)
		{
			MaxWind = MaxWind+10*Dir;
		}
	}

	void IncrementFuel(int Dir)
	{
		if(Fuel+Dir*100 <= 10000 && Fuel+Dir*100 >= 0)
		{
			Fuel += Dir*100;
		}

	}

	void IncrementHull(int Dir)
	{
		if(HullStrength + 5*Dir <= 300 && HullStrength + 5*Dir >=1)
		{
			HullStrength += 5*Dir;
		}
	}

	void ChangeStat(int statIndex, int Dir)
	{
		switch(statIndex)
		{

		case 0:


			IncrementHeight (Dir);

			break;

		case 1:

			IncrementMaxWind(Dir);

			break;

		case 2:

			IncrementFuel(Dir);

			break;

		case 3:

			IncrementHull(Dir);

			break;

		}


	}

	void OnGUI()
	{

		if(GUI.Button (new Rect(20, Screen.height-40, 220, 30), backString, menuStyle))
		{
			parentStyle.SwitchMenu(menuIndex, -1);
		}

		if(GUI.Button (new Rect(Screen.width - 240, Screen.height-40, 220, 30), launchString, menuStyle))
		{
			Launch ();
		}
		/*
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100, 30, BoxSize), "<", menuStyle))
		{

		}
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100+BoxSize, 30, BoxSize), "<", menuStyle))
		{
			
		}
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100+2*BoxSize, 30, BoxSize), "<", menuStyle))
		{
			
		}
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100+3*BoxSize, 30, BoxSize), "<", menuStyle))
		{
			
		}

		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100, 30, BoxSize), ">", menuStyle))
		{
			
		}
		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100+BoxSize, 30, BoxSize), ">", menuStyle))
		{
			
		}
		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100+2*BoxSize, 30, BoxSize), ">", menuStyle))
		{
			
		}
		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100+3*BoxSize, 30, BoxSize), ">", menuStyle))
		{
			
		}*/
		for(int i = 0; i < settings.Length; i ++)
		{

			if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100+i*BoxSize, 30, BoxSize), "<", menuStyle))
			{
				ChangeStat (i, -1);
			}

			if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100+i*BoxSize, 30, BoxSize), ">", menuStyle))
			{
				ChangeStat (i, 1);
			}

		}



		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100, 120, BoxSize), Height.ToString(), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100+BoxSize, 120, BoxSize), MaxWind.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100+2*BoxSize, 120, BoxSize), Fuel.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100+3*BoxSize, 120, BoxSize), HullStrength.ToString (), menuStyle);




		//grIndex = GUI.SelectionGrid(new Rect(100, Screen.height/2-100, 240, Screen.height/2), grIndex, settings, 1, menuStyle);

		for(int i = 0; i < 4; i ++)
		{
			GUI.Label (new Rect(100, (Screen.height/2-100)+i*BoxSize, 240, BoxSize), settings[i], menuStyle);

		}

	}


	void Start()
	{

		menuStyle = parentStyle.menuStyle;
		menuStyle.alignment = TextAnchor.MiddleLeft;
		//Debug.Log ("Joysticks: " + Input.GetJoystickNames().Length);

		BoxSize = Mathf.RoundToInt(Screen.height/(2*settings.Length));
		//Debug.Log ("Box size = " + BoxSize.ToString());
		/*
		if(parentStyle.Gamepad)
		{
			backString = "B - Back";
			launchString = "A - Launch";
		}
		else
		{
			backString = "Back";
			launchString = "Launch";
		}*/
		backString = "Back";
		launchString = "Launch";
	}
		      
		
	void Update()
	{
		/*
		if(parentStyle.Gamepad)
		{
			backString = "B - Back";
			launchString = "A - Launch";
		}
		else
		{
			backString = "Back";
			launchString = "Launch";
		}
		*/


		if(Input.GetKeyDown (KeyCode.JoystickButton0))
		{
			//parentStyle.SwitchMenu(-1, grIndex);
			Debug.Log ("Launch!");
			Launch();
		}

		if(Input.GetKey (KeyCode.JoystickButton1))
		{
			parentStyle.SwitchMenu (menuIndex, -1);
		}
		
		if(Input.GetAxis ("Vertical") > 0.5 && Rest == true)
		{
			Debug.Log ("+Y");
			
			shiftGridIndex(-1);
			Rest = false;
		}
		else if(Input.GetAxis("Vertical") < -0.5 && Rest == true)
		{
			Debug.Log ("-Y");
			
			shiftGridIndex(1);
			Rest = false;
		}
		else if(Mathf.Abs(Input.GetAxis ("Vertical")) < 0.5)
		{
			Rest = true;
		}

		if(Input.GetAxis("Horizontal") > 0.5 && X_Rest == true)
		{
			X_Rest = false;
			ChangeStat(grIndex, 1);


		}
		else if(Input.GetAxis ("Horizontal") < -0.5 && X_Rest == true)
		{
			X_Rest = false;
			ChangeStat (grIndex, -1);
		}
		else if(Mathf.Abs(Input.GetAxis ("Horizontal")) < 0.5)
		{
			X_Rest = true;
		}



	}

}
