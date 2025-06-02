using UnityEngine;
using System.Collections;

public class TradeRouteDirectory : MonoBehaviour {

	public CampaignGUI campaignControl;
	public TradeRoute[] Routes;

	public int Cycles = 0;

	int currentStep = 0;

	public void Save()
	{
		if(Cycles > 0)
		{

			if(currentStep == Routes.Length)
			{
				currentStep = 0;
			}
			FinishCycles ();


		}

		for(int i = 0; i < Routes.Length; i ++)
		{
			Routes[i].SaveState();

		}

	}

	public void Load()
	{
		for(int i = 0; i < Routes.Length; i ++)
		{

			Routes[i].LoadState ();
		}

	}

	void FinishCycles()
	{
		for(int j = 0; j < Cycles; j ++)
		{
			for(int i = currentStep; i < Routes.Length; i ++)
			{
				//if(campaignControl.

				if(i == Routes.Length-1)
				{
					Cycles --;
				}
				
				
				if(Routes[i].PirateActivity > Routes[i].basePirateActivity)
				{
					Routes[i].PirateActivity --;
				}

			}
		}
	}

	IEnumerator CalmPirates()
	{
		while(this.enabled)
		{
			//Debug.Log ("Boop!");

			if(/*campaignControl.displayOn == true && */Cycles > 0)
			{

				//Debug.Log ("Can run trade route co-routine");

				for(int i = 0; i < Routes.Length; i ++)
				{
					if(i == 0)
					{
						Debug.Log ("Starting Cycle!");
					}

					if(campaignControl.displayOn)
					{
						//Debug.Log ("Dipslay On = " + campaignControl.displayOn + " TRADE("+i+")");
						//Debug.Log("Iteration! " + i);




						if(Routes[i].PirateActivity > Routes[i].basePirateActivity)
						{
							Routes[i].PirateActivity --;
						}
					}
					else
					{
						i --;
					}
					currentStep = i+1;

					if(i == Routes.Length-1)
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

	// Use this for initialization

	void Start () 
	{
		StartCoroutine(CalmPirates ());
	}
	/*
	// Update is called once per frame
	void Update () 
	{
		CalmPirates();
	}*/
}
