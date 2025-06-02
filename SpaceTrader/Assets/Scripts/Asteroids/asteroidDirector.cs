using UnityEngine;
using System.Collections;

public class asteroidDirector : MonoBehaviour {

	public GameObject[] AsteroidRefs;

	public motherShip Ship;
	public CampaignGUI campaignStats;

	public int fieldSize = 100;

	public int fieldLength;

	GameObject tempObj;

	bool victoryDelay = false;

	void Victory()
	{
		if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
		{
			campaignStats.SetHullDamage(Ship.HullIntegrity);
			campaignStats.displayOn = true;
			
			Destroy (transform.parent.gameObject);
		}
		else 
		{
			Application.LoadLevel ("Menu");
		}
	}

	IEnumerator VictoryDelay()
	{
		if(!victoryDelay)
		{
			victoryDelay = true;

			Debug.Log("Victory Delay Start...");
			/*
			for(int i = 0; i > 2; i ++)
			{
				Debug.Log ("Victory delay check");

				if(i > 0 && Ship.alive == true)
				{
					Victory ();
				}

				yield return new WaitForSeconds(10f);

			}*/

			yield return new WaitForSeconds(6f);

			Debug.Log ("Victory Delay over!");

			if(Ship.alive) Victory();


		}

	}

	IEnumerator LongCount()
	{
		yield return new WaitForSeconds(120f);
		

		if(fieldLength > 5)
		{
			Victory();

		}

	}


	public bool Decrement()
	{
		bool continueField = true;

		fieldLength --;

		if(fieldLength <= fieldSize)
		{
			continueField = false;


		}

		if(fieldLength <= 5)
		{

			StartCoroutine(VictoryDelay());

		}

		if(fieldLength <= 0)
		{
			Victory ();
		}

		return continueField;

	}

	void createField()
	{
		float randomScale;
		float randomIndex;

		for(int i = 0; i < fieldSize; i ++)
		{
			randomScale = (Random.value+1);
			randomIndex = Random.value*2-1;
			int Index = Mathf.RoundToInt(randomIndex);
			Index = (i+Index + 3) % 3;

			tempObj = Instantiate (AsteroidRefs[Index], new Vector3(28+3f*i, (5f-(i%8f)), 0f), Quaternion.identity) as GameObject;

			tempObj.transform.parent = transform;

			//tempObj.transform.localScale = new Vector3(randomScale, randomScale, 1f);

			tempObj.transform.localScale = new Vector3(tempObj.transform.localScale.x*randomScale, tempObj.transform.localScale.y*randomScale, 1f);

			tempObj.GetComponent<Rigidbody2D>().mass = 4*randomScale;
			/*tempObj.rigidbody2D.angularVelocity = (Random.value*2f-1f)*60f;
			Debug.Log ("Angular Velocity = " + tempObj.rigidbody2D.angularVelocity);*/
			tempObj.GetComponent<Rigidbody2D>().velocity = new Vector3(-2f, 0f, 0f); 

		}
	}

	// Use this for initialization
	void Start () 
	{

		if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
		{
			campaignStats = GameObject.FindGameObjectWithTag("Galaxy").GetComponent <CampaignGUI>();
			fieldLength = Mathf.CeilToInt(PlayerPrefs.GetInt ("AsteroidDensity")*fieldSize/10);
		}
		else
		{
			Ship.HullIntegrity = PlayerPrefs.GetInt("QuickHull");
			fieldLength = PlayerPrefs.GetInt ("QuickLength");
			fieldSize = PlayerPrefs.GetInt ("QuickDense");
		}

		createField();
		

		
	}
	/*
	// Update is called once per frame
	void Update () 
	{
		if(fieldLength == 0)
		{
			Debug.Log ("VICTORY!");
			if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
			{
				campaignStats.SetHullDamage(Ship.HullIntegrity);
				campaignStats.displayOn = true;

				Destroy (transform.parent.gameObject);
			}

		}
	}
	*/
}
