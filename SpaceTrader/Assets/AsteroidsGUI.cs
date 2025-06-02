using UnityEngine;
using System.Collections;

public class AsteroidsGUI : MonoBehaviour {

	public motherShip ShipStats;
	public GUIStyle AsteroidsStyle;



	void OnGUI()
	{
		GUI.Box (new Rect(0, 0, Screen.width, 60), "", AsteroidsStyle); 
		GUI.Label (new Rect(15, 15, Screen.width/2, 30), "HULL: " + ShipStats.HullIntegrity.ToString (), AsteroidsStyle);
		GUI.Label (new Rect(Screen.width/2+15, 15, Screen.width/4, 30), "SHIELD LEVEL: " + ShipStats.shieldControl.power.ToString(), AsteroidsStyle);

		if(ShipStats.shieldControl.timer != 0 && ShipStats.shieldControl.ShieldsOn() == false)
		{
			GUI.Label (new Rect(Screen.width*3/4+15, 15, Screen.width/4, 30), "REGENERATING", AsteroidsStyle);

		}

	}



	/*
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}*/
}
