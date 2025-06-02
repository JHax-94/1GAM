using UnityEngine;
using System.Collections;

public class Planet : MonoBehaviour 
{
	public int Index;


	public CampaignGUI campaignControl;

	public string Name;

	public TradeRoute[] Routes;

//	public string[] Commodities;
	
	public float[] Stock;

	public float[] Supply;  
	public float[] Demand;

	public float[] blackStock;

	public Upgrade[] upgrades;

//	public float[] blackSupply;
//	public float[] blackDemand;

	public bool[] Embargoed;
	
	public int[] hangar = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

	public int WindStrength = 0;
	public int DropHeight = 100;


	float[] baseValues = {1, 10, 50, 60, 15, 30, 5, 25, 200, 400, 70, 500};


	public int blackSupply(int index)
	{
		int bSup = 0;

		if(Embargoed[index] == true)
		{
			bSup = Mathf.RoundToInt (Supply[index]/2);

		}

		return bSup;

	}


	public void RandomWalk()
	{
		for(int i = 0; i < 12; i ++)
		{
			int flip = Mathf.RoundToInt(Random.value*3);

			//Debug.Log ("FLIP " + i.ToString () + " = " + flip.ToString());

			if(flip == 0)
			{
				Supply[i] -= 10;
				Demand[i] -= 10;
			}
			else if(flip == 1)
			{
				Supply[i] -= 10;
				Demand[i] += 10;
			}
			else if(flip == 2)
			{
				Supply[i] += 10;
				Demand[i] -= 10;
			}
			else if(flip == 3)
			{
				Supply[i] += 10;
				Demand[i] += 10;
			}

			if(Supply[i] < 5)
			{
				Supply[i] = 5;
			}

			if(Demand[i] < 5)
			{
				Demand[i] = 5;
			}


			float rand_A = Random.value;
			float rand_B = Random.value;

			if(rand_A < 0.1 && rand_B < 0.06)
			{
				Debug.Log("EMBARGO!");

				Embargoed[i] = !Embargoed[i];

			}

		}

		//SaveRates();

	}

	public void ReduceHeight()
	{
		DropHeight -= 5;

		if(DropHeight < 100)
		{
			DropHeight = 100;
		}

	}

	public void Volatility()
	{
		RandomWalk();

		for(int i = 0; i < Routes.Length; i ++)
		{
			Routes[i].nextPlanet(Name).RandomWalk();
		}
	}

	public void SaveRates()
	{
		for(int i = 0; i < 12; i++)
		{
			PlayerPrefs.SetFloat (Name+"_Supply_"+i.ToString (), Supply[i]);
			PlayerPrefs.SetFloat(Name + "_Demand_" + i.ToString (), Demand[i]);
		}
	}

	public void SaveCargo()
	{
		for(int i = 0; i < 12; i ++)
		{
			PlayerPrefs.SetInt (Name+"_Hangar_"+i.ToString (), hangar[i]);
		}
	}

	public void SaveState()
	{
		// SAVE SUPPLY & DEMAND

		for(int i = 0; i < 12; i ++)
		{
			PlayerPrefs.SetFloat (Name+"_Supply_"+i.ToString (), Supply[i]);
			PlayerPrefs.SetFloat(Name + "_Demand_" + i.ToString (), Demand[i]);
			if(Embargoed[i])
			{
				PlayerPrefs.SetInt (Name+"_Embargoed_"+i.ToString(), 1);
			}
			else
			{
				PlayerPrefs.SetInt (Name+"_Embargoed_" +i.ToString (), 0);
			}

			PlayerPrefs.SetInt (Name+"_Hangar_"+i.ToString (), hangar[i]);

		}
	}

	public void LoadState()
	{
		for(int i = 0; i < 12; i ++)
		{
			Supply[i] = PlayerPrefs.GetFloat (Name+"_Supply_"+i.ToString ());
			Demand[i] = PlayerPrefs.GetFloat (Name+"_Demand_"+i.ToString());
			hangar[i] = PlayerPrefs.GetInt (Name+"_Hangar_"+i.ToString ());

			if(PlayerPrefs.GetInt (Name+"_Embargoed_"+i.ToString ()) == 1)
			{
				Embargoed[i] = true;
			}
			else
			{
				Embargoed[i] = false;
			}
		}
	}

	public Planet TakeRoute(int index)
	{
		return Routes[index].nextPlanet(Name);


	}

	public void Restock()
	{
		for(int i = 0; i < 12; i ++)
		{
			if(Supply[i] < 0)
			{
				Supply[i] = 1;
			}
			if(Demand[i] < 0)
			{
				Demand[i] = 1;
			}

			Stock[i] = Mathf.FloorToInt (0.2f*Supply[i]);
			blackStock[i] = Mathf.FloorToInt (0.1f*Supply[i]);
		}

	}

	public float buyValue(int index)
	{
		float PpU = 1;
		if(Supply[index] != 0)
		{
			PpU = (Demand[index]/Supply[index])*baseValues[index];
		}
		else
		{
			PpU = Demand[index]*baseValues[index];
		}

		return PpU;

	}

	public float sellValue(int index)
	{
		float PpU = 1;

		if(Supply[index] != 0)
		{
			PpU = (Demand[index]/Supply[index])*baseValues[index]*0.5f;
		}
		else
		{
			PpU = Demand[index]*baseValues[index]*0.5f;
		}

		return PpU;
	}

	public float blackBuyValue(int index)
	{

		float PpU = 1;


		if(Embargoed[index])
		{
			PpU = (Demand[index]/blackSupply(index))*2*baseValues[index];

		}


		return PpU;
	}

	public float blackSellValue(int index)
	{
		float PpU = 1; 

		if(Embargoed[index])
		{
			PpU = (Demand[index]/blackSupply(index))*1.5f*baseValues[index];

		}

		return PpU;
	}

	public string[] Destinations()
	{
		string[] destNames = new string[Routes.Length];

		for(int i = 0; i < Routes.Length; i ++)
		{
			destNames[i] = Routes[i].Destination(Name);
		}

		return destNames;
	}


}
