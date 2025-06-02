using UnityEngine;
using System.Collections;

public class spawnDelay : MonoBehaviour {

	public DirectorAI Director;


	public float countdown;
	//public float timer;

	bool On;

	// Use this for initialization

	public void StartTimer(float time)
	{
		Debug.Log("Timer started...");

		countdown = time;
		On = true;
	}


	// Update is called once per frame
	void Update () 
	{
		if(On)
		{
			countdown -= Time.deltaTime;
			if(countdown < 0)
			{
				//Director.EnableNextObject();
				Director.timerOff();
			}
		}
	}
}
