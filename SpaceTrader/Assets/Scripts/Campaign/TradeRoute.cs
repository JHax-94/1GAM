using UnityEngine;
using System.Collections;

public class TradeRoute : MonoBehaviour {

	public CampaignGUI campaignControl;

	public string description;

	public float Distance;

	public float basePirateActivity;
	public float PirateActivity;

	public float AsteroidDensity;

	public Planet[] Ends;

	public int Traversals = 0;

	public void BoostRisk()
	{
		PirateActivity += 50;

		if(PirateActivity > 150)
		{
			PirateActivity = 150;
		}

	}

	public void SaveState()
	{
		PlayerPrefs.SetFloat(description+"_pirateActivity", PirateActivity);
		PlayerPrefs.SetInt (description+"_Traversals", Traversals);
	}

	public void LoadState()
	{
		PirateActivity = PlayerPrefs.GetFloat (description+"_pirateActivity");
		Traversals = PlayerPrefs.GetInt (description+"_Traversals", Traversals);
	}

	string Risk(float percentage)
	{
		string riskLevel = "LOW";


		if(percentage > 33)
		{
			riskLevel = "MEDIUM";
		}
		if(percentage > 67)
		{
			riskLevel = "HIGH";
		}

		return riskLevel;
	}

	public string PirateRisk()
	{
		return Risk (PirateActivity);
	}

	public string AsteroidRisk()
	{
		return Risk (AsteroidDensity);
	}

	public Planet nextPlanet(string From)
	{
		Planet target = null;

		for(int i = 0; i < 2; i ++)
		{
			if(Ends[i].Name != From)
			{
				target = Ends[i];
			}
		}

		return target;

	}

	public string Destination(string From)
	{
		string To = "NONE";

		for(int i = 0; i < 2; i ++)
		{
			if(Ends[i].Name != From)
			{
				To = Ends[i].Name;
			}
		}

		return To;

	}

	/*
	// Use this for initialization
	void Start () 
	{
	
	}
*/
	// Update is called once per frame
/*	void Update () 
	{
		if(campaignControl
	}*/
}
