using UnityEngine;
using System.Collections;

public class GameOverScreen : MonoBehaviour {

	public GUIStyle GameOverStyle;
	public GUIStyle AnyStyle;

	void OnGUI()
	{
		GUI.Label (new Rect(Screen.width/2-200, Screen.height/2-200, 400, 200), "GAME OVER", GameOverStyle);
		GUI.Label (new Rect(Screen.width/2-200, Screen.height/2+50, 400, 200), "PRESS ANY KEY", AnyStyle);

	}

	// Use this for initialization

	
	// Update is called once per frame
	void Update () 
	{
		if(Input.anyKeyDown)
		{
			PlayerPrefs.SetInt("InProgress", 0);
			PlayerPrefs.Save ();
			Application.LoadLevel ("Menu");


		}


	}
}
