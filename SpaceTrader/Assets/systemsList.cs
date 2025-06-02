using UnityEngine;
using System.Collections;

public class systemsList : MonoBehaviour {


	public CampaignGUI campaignControl;
	public Planet[] Systems;

	public int Cycles = 0;

	public string[] Names;

	int currentStep = 0;

	public void Save()
	{

		if(currentStep == Systems.Length)
		{
			currentStep = 0;
		}

		for(int i = 0; i < Systems.Length; i ++)
		{
			Systems[i].SaveState();
		

		}
	}

	public void Load()
	{
		for(int i = 0; i < Systems.Length; i ++)
		{
			Systems[i].LoadState ();
		}
	}

	void FinishCycles()
	{
		for(int j = 0; j < Cycles; j ++)
		{
			for(int i = currentStep; i < Systems.Length; i ++)
			{
				if(Cycles == Systems.Length-1)
				{
					Cycles --;
				}
				//Debug.Log ("Random walking " + i);
				if(Systems[i] != campaignControl.activePlanet) Systems[i].RandomWalk();
			}
		}
	}

	IEnumerator RandomWalks()
	{
		while(this.enabled)
		{
			//Debug.Log ("Beep!");

			if(/*campaignControl.displayOn == true && */Cycles > 0)
			{


				//Debug.Log("Can run System Coroutine");

				//Debug.Log ("Display On = " + campaignControl.displayOn);

				for(int i = 0; i < Systems.Length; i ++)
				{

					if(i == 0)
					{
						Debug.Log ("Starting cycle!");
					}


					if(campaignControl.displayOn )
					{
					//	Debug.Log ("Display On = " + campaignControl.displayOn + " ("+i+")");


					//	Debug.Log ("Random walking " + i);
						if(Systems[i] != campaignControl.activePlanet) 
						{
							if(Systems[i] != campaignControl.viewPlanet)
							{
								Systems[i].RandomWalk();
								Systems[i].ReduceHeight();
							}
							else i --;
						}

					}
					else
					{
						i --;
					}

					if(i == Systems.Length-1)
					{
						Debug.Log ("Cycle finished!");
						Cycles --;
					}

					yield return new WaitForSeconds(0.01f);
				}
			}
			else yield return new WaitForSeconds(0.01f);
		}
	}


	public Planet GetPlanet(string NAME)
	{
		Planet returnPlanet = null;


		for(int i = 0; i < Systems.Length; i ++)
		{
			if(NAME == Systems[i].Name)
			{
				returnPlanet = Systems[i];
			}
		}

		return returnPlanet;

	}

	void CreateBaseSave()
	{
		for(int i = 0; i < Systems.Length; i ++)
		{
			Systems[i].SaveState();

		}

	}


	public void Volatility()
	{
		for(int i = 0; i < Systems.Length; i ++)
		{
			Systems[i].RandomWalk();
		}
	}

	void LoadGalaxy()
	{
		for(int i = 0; i < Systems.Length; i ++)
		{
			Systems[i].LoadState ();

		}
	}

	// Use this for initialization
	void Start () 
	{
		if(PlayerPrefs.GetInt ("NewGame") == 1)
		{
			PlayerPrefs.SetInt ("NewGame", 0);
			CreateBaseSave();
		}
		else
		{
			LoadGalaxy();
		}



		for(int i = 0; i < Systems.Length; i ++)
		{
			Names[i] = Systems[i].Name;

		}

		StartCoroutine (RandomWalks ());
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
