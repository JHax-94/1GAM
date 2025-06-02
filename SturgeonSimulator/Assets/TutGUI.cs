using UnityEngine;
using System.Collections;

public class TutGUI : MonoBehaviour {

	public GUIStyle TutStyle;

	void OnGUI()
	{


		if(GUI.Button (new Rect(Screen.width/2-50, Screen.height-60, 100, 45), ""))
		{
			PlayerPrefs.SetInt ("TutorialOn", 0);
			Application.LoadLevel ("River");
		}
		GUI.Label (new Rect(Screen.width/2-50, Screen.height-60, 100, 45), "READY!", TutStyle);

	}

}
