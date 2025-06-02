using UnityEngine;
using System.Collections;

public class DirectorAI : MonoBehaviour {

	CampaignGUI campaignStats;

	public int[] spawnDists = {10, 12, 14, 16};

	public GameObject piratePrefab;
	public int spawnNumber;

	public spawnDelay timer;

	float conversion = Mathf.Deg2Rad;

	public float previousAngle = 0;

	public int nQueue = 3;

	GameObject tempObj;

	GameObject[] Pool;

	public int spawnIndex;
	public int shipsRemaining = 100;

	public motherShip Ship;


	IEnumerator EndGameTimer()
	{
		for(int i = 0; i < 2; i ++)
		{
			if(i > 0)
			{
				if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
				{
					campaignStats.SetHullDamage(Ship.HullIntegrity);
					campaignStats.displayOn = true;
					Destroy(transform.parent.gameObject);
				}
				else
				{
					Application.LoadLevel ("Menu");
				}
			}

			yield return new WaitForSeconds(3f);
		}

	}

	public void shipDestroyed()
	{
		shipsRemaining --;

		if(shipsRemaining == 0)
		{
			//campaignStats.SetHullDamage (Ship.HullIntegrity);
			//campaignStats.displayOn = true;
			//Destroy (transform.parent.gameObject);

			StartCoroutine(EndGameTimer ());
		}
	}

	IEnumerator EnableShip()
	{
		//Debug.Log ("Spawn Index = " + spawnIndex);
		//Debug.Log ("Queue = " + nQueue);



		float EnableAngle = ((Random.value*180)+90) + previousAngle;

		yield return new WaitForSeconds(0.1f);
		if(EnableAngle >= 360)
		{
			EnableAngle -= 360;
		}

		previousAngle = EnableAngle;

		yield return new WaitForSeconds(0.1f);
		//Pool[spawnIndex].collider2D.enabled = true;
		Debug.Log("Enabling at angle: " + EnableAngle);
		Pool[spawnIndex].transform.position = new Vector3(Mathf.Cos(EnableAngle*conversion), Mathf.Sin (EnableAngle*conversion), 0f)*spawnDists[shipsRemaining%4];

		yield return new WaitForSeconds(0.1f);

		Pool[spawnIndex].transform.up = Pool[spawnIndex].transform.position;

		yield return new WaitForSeconds(0.1f);
		//Pool[spawnIndex].GetComponent <pirateShip>().TravelTo (transform.position*(3.5f/transform.position.magnitude));
		Pool[spawnIndex].GetComponent <ActivationControl>().ActivatePirate();
		//	Active ++;

		yield return new WaitForSeconds(0.1f);

		nQueue --;
		spawnIndex ++;


	}
	

	public void EnableNextObject()
	{
		Debug.Log ("Enable...\nQueue = " + nQueue);


		if(nQueue > 0 && timer.enabled == false)
		{
			Debug.Log ("Spawn Index = " + spawnIndex +"\nSpawn Number = " + spawnNumber);

			if(spawnIndex < spawnNumber)
			{
				StartCoroutine (EnableShip ());

				timer.enabled = true;
				timer.StartTimer(1.2f);
			}
		}

	}

	public void timerOff()
	{
		timer.enabled = false;
		EnableNextObject();
	}

	public void ActiveSpawn()
	{
		Debug.Log ("Active spawn!");
		nQueue ++;
		EnableNextObject();
	}


	void SafeSpawn()
	{


		// CALL ON LEVEL LOAD
		// POOL PIRATE SHIPS SOMEWHERE THEY WON'T OVERLAP & OFF SCREEN

		// SAFE SPAWN


		for(int i = 0; i < spawnNumber; i ++)
		{
			tempObj = Instantiate(piratePrefab, new Vector3(3f*i, 10f, 0f), Quaternion.identity) as GameObject;
			tempObj.transform.parent = transform;

			Pool[i] = tempObj;

			Debug.Log ("Pool_"+i+" = " + Pool[i].name);
		}
		shipsRemaining = spawnNumber;





	}





	// Use this for initialization
	void Start () 
	{
		if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
		{
			spawnNumber = Mathf.RoundToInt(Random.value*3*PlayerPrefs.GetInt ("PirateActivity")/5)+3;
			Ship.HullIntegrity = PlayerPrefs.GetInt ("Mother_Hull");
			campaignStats = GameObject.FindGameObjectWithTag("Galaxy").GetComponent<CampaignGUI>();

		}
		else
		{
			spawnNumber = PlayerPrefs.GetInt ("PirateCount");
			Ship.HullIntegrity = PlayerPrefs.GetInt ("QuickHull");
			nQueue = PlayerPrefs.GetInt ("QueueLength");

		}

		Debug.Log ("Setting spawn to zero!");
		spawnIndex = 0;
		Pool = new GameObject[spawnNumber];

		SafeSpawn ();	
		EnableNextObject();
	}
	
	// Update is called once per frame
	/*void Update () 
	{
	
	}
	*/
}
