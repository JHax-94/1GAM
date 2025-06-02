using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {

	public Texture2D CasualControls;
	public Texture2D HardcoreControls;

	public GUIStyle titleStyle;

	public GUIStyle sturgeonStyle;

	bool showTut = true;

	int[] topScore = {0, 0};

	// Use this for initialization
	void Start () 
	{
		if(!PlayerPrefs.HasKey ("TopScoreFilthy"))
		{
			PlayerPrefs.SetInt ("TopScoreFilthy", 0);
		}
		else
		{
			topScore[0] = PlayerPrefs.GetInt ("TopScoreFilthy");
		}

		if(!PlayerPrefs.HasKey ("TopScoreHard"))
		{
			PlayerPrefs.SetInt ("TopScoreHard", 0);
		}
		else
		{
			topScore[1] = PlayerPrefs.GetInt ("TopScoreHard");
		}

		if(!PlayerPrefs.HasKey ("TutorialOn"))
		{
			showTut = true;
			PlayerPrefs.SetInt ("TutorialOn", 1);
		}
		else
		{
			if(PlayerPrefs.GetInt ("TutorialOn") == 1)
			{
				showTut = true;
			}
			else 
			{
				showTut = false;
			}
		}





		Cursor.visible = true;

	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/

	int menuIndex = 0;

	void OnGUI()
	{
		GUI.Label (new Rect(15, Screen.height-80, Screen.width, 80), "Game by Josh Haxell\n(c) Josh Haxell 2015\nMade with Unity\nFont: Oswald (Google Fonts - Vernon Adams)");
	

		switch(menuIndex)
		{
		case 0:

			GUI.BeginGroup (new Rect(Screen.width/2-100, Screen.height/2-80, 200, 160));
			GUI.Box (new Rect(0, 0, 200, 160), "");
			GUI.Label (new Rect(0, 10, 200, 80), "STURGEON SIMULATOR\n2014\n2015 EDITION", titleStyle); 



			if(GUI.Button (new Rect(20, 120, 160, 30), ""))
			{
				//Application.LoadLevel ("River");
				menuIndex = 1;
			}

			GUI.Label (new Rect(20, 120, 160, 30), "START", sturgeonStyle);

			GUI.EndGroup();


			break;

		case 1:

			GUI.Box (new Rect(Screen.width/2-100, Screen.height/2-200, 200, 40), "");
			GUI.Box (new Rect(Screen.width/2-100, Screen.height/2-200, 200, 20), "CONTROL STYLE", titleStyle);

			showTut = GUI.Toggle(new Rect(Screen.width/2-50, Screen.height/2-180, 100, 30), showTut, "Show Tutorial");

			GUI.BeginGroup (new Rect(Screen.width/2-400, Screen.height/2-150, 300, 300));

			GUI.Box (new Rect(0, 0, 300, 300), "");

			GUI.Label (new Rect(20, 35, 100, 30), "Personal Best: " + topScore[0], sturgeonStyle);
			GUI.DrawTexture (new Rect(-10, 20, 320, 270), CasualControls);

			if(GUI.Button (new Rect(5, 5, 290, 30), ""))
			{
				PlayerPrefs.SetInt ("ControlStyle", 0);

				if(!showTut)
				{
					Application.LoadLevel ("River");
					PlayerPrefs.SetInt("TutorialOn", 0);
				}
				else
				{
					Application.LoadLevel ("Tutorial");
				}
			}

			GUI.Label (new Rect(5, 5, 290, 30), "FILTHY CASUAL", sturgeonStyle);

			GUI.EndGroup();

			GUI.BeginGroup (new Rect(Screen.width/2+100, Screen.height/2-150, 300, 300));

			GUI.Box (new Rect(0, 0, 300, 300), "");

			GUI.Label (new Rect(15, 35, 100, 30), "Personal Best: " + topScore[1], sturgeonStyle);
			GUI.DrawTexture(new Rect(0, 10, 300, 290), HardcoreControls);


			if(GUI.Button (new Rect(5, 5, 290, 30), ""))
			{
				PlayerPrefs.SetInt("ControlStyle", 1);
				if(!showTut)
				{
					Application.LoadLevel ("River");
					PlayerPrefs.SetInt("TutorialOn", 0);
				}
				else
				{
					Application.LoadLevel ("Tutorial");
				}
			}

			GUI.Label (new Rect(5, 5, 290, 30), "HARDCORE", sturgeonStyle);

			GUI.EndGroup();

			break;
		}
	}


}
