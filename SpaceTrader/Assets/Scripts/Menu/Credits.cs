using UnityEngine;
using System.Collections;

public class Credits : MonoBehaviour {

	public MenuStyle parentStyle;

	GUIStyle creditsStyle;
	const int menuIndex = 5;

	void OnGUI()
	{
		GUI.Label (new Rect(Screen.width/2 - 300, Screen.height/2-150, 600, 300), "Game by Josh Haxell\n\nTitle Font - Audiowide (Google Fonts - Astigmatic)\n\nFont - Press Start 2P (Google Fonts - CodeMan38)\n\nMade with Unity", creditsStyle);


		if(GUI.Button (new Rect(20, Screen.height-40, 220, 30), "Back", creditsStyle))
		{
			parentStyle.SwitchMenu(menuIndex, -1);
		}
	}

	// Use this for initialization
	void Start () 
	{
		creditsStyle = parentStyle.menuStyle;
		creditsStyle.alignment =  TextAnchor.MiddleCenter;
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}*/
}
