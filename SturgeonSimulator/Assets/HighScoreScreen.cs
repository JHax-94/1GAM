using UnityEngine;
using System.Collections;

public class HighScoreScreen : MonoBehaviour 
{
	public GUIStyle HighScoreStyle;

	/*
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}*/

	void OnGUI()
	{
		GUI.BeginGroup(new Rect(Screen.width/2-120, Screen.height/2-50, 240, 100));

		GUI.Box (new Rect(0, 0, 240, 100), "");
		GUI.Label (new Rect(0, 0, 240, 100), "NEW HIGH SCORE!\n\nPRESS ANY KEY TO CONTINUE", HighScoreStyle);

		GUI.EndGroup ();
	}


	void Update()
	{
		if(Input.anyKey)
		{

			Application.LoadLevel ("MainMenu");

		}
	}




}
