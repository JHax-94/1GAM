using UnityEngine;
using System.Collections;

public class Upgrade : MonoBehaviour {
	
	public CampaignGUI campaignVars;

	public string UpgradeName;
	public string Level;

	public int Cost;

	public int newValue;
	public int requiredValue;

	int stat;

	public string DisplayUpgade()
	{
		string returnString = UpgradeName + " " + Level + " ("+Cost+" CREDITS)";
		/*
		if(UpgradeName == "HOLD")
		{
			if(campaignVars.dropShipCapacity != requiredValue)
			{
				returnString = "";
			}
		}
		else if(UpgradeName == "FUEL TANK")
		{
			if(campaignVars.dropFuelMax != requiredValue)
			{
				returnString = "";
			}

		}
		else if(UpgradeName == "HULL STRENGTH")
		{
			if(campaignVars.dropHullMax != requiredValue)
			{
				returnString = "";
			}

		}
		else if(UpgradeName == "FUEL EFFICIENCY")
		{
			if(campaignVars.Efficiency != requiredValue)
			{
				returnString = "";
			}

		}
*/
		return returnString;


	}

	public int CanUpgrade()
	{

		int canUpgrade = 1;

		if(UpgradeName == "HOLD")
		{
			if(campaignVars.dropShipCapacity < requiredValue)
			{
				canUpgrade = 0;
			}
			else if(campaignVars.dropShipCapacity > requiredValue)
			{
				canUpgrade = -1;
			}
		}
		else if(UpgradeName == "FUEL TANK")
		{
			if(campaignVars.dropFuelMax < requiredValue)
			{
				canUpgrade = 0;
			}
			else if(campaignVars.dropFuelMax > requiredValue)
			{
				canUpgrade = -1;
			}

			
		}
		else if(UpgradeName == "HULL STRENGTH")
		{
			if(campaignVars.dropHullMax < requiredValue)
			{
				canUpgrade = 0;
			}
			else if(campaignVars.dropHullMax > requiredValue)
			{
				canUpgrade = -1;
			}
			
		}
		else if(UpgradeName == "FUEL EFFICIENCY")
		{
			if(campaignVars.Efficiency < requiredValue)
			{
				canUpgrade = 0;
			}
			else if(campaignVars.Efficiency > requiredValue)
			{
				canUpgrade = -1;
			}
			
		}


		return canUpgrade;

	}

	public void performUpgrade()
	{
		if(Cost <= campaignVars.Credits)
		{
			campaignVars.Credits -= Cost;

			if(UpgradeName == "HOLD")
			{
				campaignVars.dropShipCapacity = newValue;
			}
			else if(UpgradeName == "FUEL TANK")
			{
				campaignVars.dropFuelMax = newValue;
			}
			else if(UpgradeName == "HULL STRENGTH")
			{
				campaignVars.dropHullMax = newValue;
			}
			else if(UpgradeName == "FUEL EFFICIENCY")
			{
				campaignVars.Efficiency = newValue;
			}
		}

	}


	// Use this for initialization
	void Start () 
	{
	
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
