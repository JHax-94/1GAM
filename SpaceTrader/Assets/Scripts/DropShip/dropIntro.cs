using UnityEngine;
using System.Collections;

public class dropIntro : MonoBehaviour {



	public dropShipControls playerShip;

	public GameObject shipClose;
	public GameObject longMarker;
	public GameObject shortMarker;
	public GameObject Claw;

	public BoxCollider2D leftWall;
	public BoxCollider2D RightWall;

	public windEffect windMachine;



	bool grounded = false;

	CampaignGUI campaignVars;

	GameObject tempObj;

	int Height;
	int MaxWind;
	float Wind;
	int Hull;
	int Fuel;

	void placeWarnings()
	{
		//int markerHeight = 0;

		for(int i = 5; i < Height; i += 5)
		{
			if(i < 26)
			{
				tempObj = Instantiate(shortMarker, new Vector3(6f , i, 0f), Quaternion.identity) as GameObject; 
			}
			else if(i%10 == 5)
			{
				tempObj = Instantiate (longMarker, new Vector3(6f, i, 0f), Quaternion.identity) as GameObject;

				if(i > (Height-31))
				{
					tempObj.transform.parent = transform;
					Debug.Log ("Warning Height = " + i);
					tempObj = Instantiate(shipClose, new Vector3(-6f, i, 0f), Quaternion.identity) as GameObject;
				}
			}

			 tempObj.transform.parent = transform;
		}
	}


	public int MaxHeight()
	{
		return Height-5;
	}


	// Use this for initialization
	void Awake () 
	{
		float load_X = 0f;
		float load_Y = 0f;

		if(PlayerPrefs.GetString ("GameType") == "QUICK")
		{
			// LOAD FROM QUICKPLAY STATS

			Height = PlayerPrefs.GetInt("Drop_Height");
			MaxWind = PlayerPrefs.GetInt ("Max_Wind");
			Fuel = PlayerPrefs.GetInt("Fuel");
			Hull = PlayerPrefs.GetInt ("Hull");



		}
		else
		{
			campaignVars = GameObject.FindGameObjectWithTag("Galaxy").GetComponent<CampaignGUI>();

			// LOAD FROM CAMPAIGN SAVE
			// DROP HEIGHT & MAX WIND FROM LOCATION
			//Height = PlayerPrefs.GetInt ("Drop_Height");
			//MaxWind = PlayerPrefs.GetInt ("Max_Wind");

			Height = campaignVars.activePlanet.DropHeight;
			MaxWind = campaignVars.activePlanet.WindStrength;

			// FUEL & HULL FROM PLAYER SHIP STATS

			//Fuel = PlayerPrefs.GetInt ("1_Fuel");
			//Hull = PlayerPrefs.GetInt ("1_Hull");

			campaignVars.getStats (ref Fuel, ref Hull);

			if(PlayerPrefs.GetString("StartFrom") == "GROUND")
			{
				grounded = true;
				load_X = PlayerPrefs.GetFloat ("Land_X");
				load_Y = PlayerPrefs.GetFloat ("Land_Y");

			}

		}


		Wind = (Random.value*2-1)*MaxWind;
		if(Mathf.Abs (Wind) > 0)
		{
			windMachine.enabled = true;
			windMachine.windSpeed = Wind;
		}

		windMachine.setHeight (Height);

		//playerShip.rigidbody2D.constantForce.relativeForce = new Vector3(Wind, 0);
		transform.position = new Vector3(0f, Height, 0f);
		placeWarnings();

		leftWall.offset = new Vector2(0, -Height/2);
		leftWall.size = new Vector2(1, Height);

		RightWall.offset = new Vector2(0, -Height/2);
		RightWall.size = new Vector2(1, Height);

		playerShip.Fuel = Fuel;
		playerShip.HullStrength = Hull;

		//playerShip.transform.parent = null;

		if(grounded)
		{
			// REMOVE CLAW

			Destroy(Claw);


			// PLACE DROP SHIP ON GROUND PAD

			playerShip.transform.position = new Vector3(load_X, load_Y, 0f);
			playerShip.transform.Rotate(new Vector3(0f, 0f, 90f));


		}

	}
	
	// Update is called once per frame
	/*void Update () {
	
	}*/
}
