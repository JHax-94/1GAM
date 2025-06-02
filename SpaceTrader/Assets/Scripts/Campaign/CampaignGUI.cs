using UnityEngine;
using System.Collections;

public class CampaignGUI : MonoBehaviour {



	public GUIStyle campaignStyle;

	//public DropModeControl DropMode;


	public TradeRouteDirectory TradeDirector;
	public systemsList Directory;
	public Planet activePlanet;

	
	public Planet viewPlanet;

	public string[] RouteTo = {"-"};
	int routeLength = 1;
	int routeStep = 0;

	string[] commods = {"FOOD","WATER","OXYGEN","MEDICINE", "LIGHT FUEL", "HEAVY FUEL" ,"METAL", "WEAPONS", "HEAVY MUNITIONS", "BIOWEAPONS","SPICE", "MAGUFFIUM"};

	int[] motherHold = {1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
	int[] dropHold = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

	GUIStyle warningStyle;
	GUIStyle bodyStyle;
	GUIStyle gridStyle;
	GUIStyle bigGridStyle;

	bool orbiting = true;

	string[] tabs = {"BRIDGE", "CARGO BAY", "ENGINEERING", "MARKET", "BLACK MARKET"};
	int tabIndex = 0;

	//string[] sQuantities = {"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"};
	int[] nQuantities =    {0, 0 , 0, 0, 0 , 0, 0, 0 , 0, 0, 0 , 0};


	string[] marketTabs = {"BUYING", "SELLING"};
	int markIndex = 0;

	public int Credits = 10000;

	public int dropFuelMax = 1000;
	public int dropHullMax = 100; 

	int dropShipFuel = 1000;
	int dropShipHull = 100;

	public int dropShipCapacity = 1000;

	int motherShipFuel = 10000;
	int motherShipHull = 10000;

	int motherFuelMax = 10000;
	int motherHullMax = 10000;
	public int Efficiency = 10;

	int prevIndex = 0;
	int prevMark = 0;

	int pathIndex = 0;

	string tempString;
	string priceString;

	//bool newPlanet = true;
	int travelCount = 0;

	bool inRange = false;

	bool buttonReady = true;
	const float buttonDelay = 0.2f;
	float delayTimer = 0.2f;

	bool travelling = false;

	public bool displayOn = true;
	bool subMenu = false;
	int subMenuIndex = 0;
	int returnToIndex = 0;

	bool pauseMenu = false;
	public bool continueChoice = false;

	bool hasWon = false;
	bool victoryMessage = false;

	bool plotting = false;

	public int jumps = 0;

	public int newDropShipCost = 0;


	IEnumerator StartNavComputer(Planet To)
	{
		//yield return new WaitForSeconds(0.1f);
		yield return new WaitForFixedUpdate();
		PlotCourse(To);
	}

	public void CustomsCheck()
	{

		for(int i = 0; i < 12; i ++)
		{
			if(activePlanet.Embargoed[i])
			{
				if(Random.value > 0.1)
				{
					dropHold[i] = 0;

				}

			}

		}
	}

	public void DropShipDestroyed()
	{
		if(Credits < newDropShipCost)
		{
			Debug.Log ("Game over!");
			Application.LoadLevel ("GameOver");
		}
		else
		{
			Debug.Log ("Continue option...");
			continueChoice = true;
			/*
			PlayerPrefs.SetInt ("1_Capacity", dropShipCapacity);
			
			PlayerPrefs.SetInt("1_Fuel", dropShipFuel);
			PlayerPrefs.SetInt("FuelMax", dropFuelMax);
			
			PlayerPrefs.SetInt("1_Hull", dropShipHull);
			PlayerPrefs.SetInt ("DropHullMax", dropHullMax);
			
			for(int i = 0; i < 12; i ++)
			{
				PlayerPrefs.SetInt ("DropShip_"+i.ToString (), 0);
			}
			*/

		}

	}

	public IEnumerator DropFail()
	{
		for(int i = 0; i < 2; i ++)
		{
			if(i == 1)
			{
		//		continueChoice = true;
				DropShipDestroyed();
				
			}
			yield return new WaitForSeconds(3f);
		}
	}


	// =========================================================
	//  COURSE PLOTTER - CLUMSY ATTEMPT AT DIJKSTRA'S ALGORITHM 
	// =========================================================

	void PlotCourse(Planet To)
	{
		bool ERROR = false;

		int dist = 0;
		int[] Labels = new int[36];
		int[] tempDists = new int[36];

		int[] permanentIndices = new int[36];

		int[] tempIndices = new int[36];
		int temporaryLabels = 0;


		int Label = 2;

		int currentIndex = activePlanet.Index;

		Planet currentPlanet = activePlanet;

		bool goalReached = false;

		for(int i = 0; i < 36; i ++)
		{
			Labels[i] = -1;
			tempDists[i] = -1;
		}

		tempDists[currentIndex] = 0;
		Labels[currentIndex] = 1;
		 
		int smallestTemp = -1;
		int smallestTempInd = -1;

		int minDistance = 0;

		while(!goalReached)
		{
		
			Debug.Log ("Routes from Planet: " + currentPlanet.Name);

			// - - - CYCLE THROUGH NON-PERMANENT ROUTES FOR PLANET - - -

			for(int i = 0; i < currentPlanet.Routes.Length; i ++)
			{
				int comparisonIndex = currentPlanet.Routes[i].nextPlanet(currentPlanet.Name).Index; // INDEX OF PLANET WE ARE COMPARING WITH

				dist = tempDists[currentIndex];

				if(Labels[comparisonIndex] == -1) // IF THIS PLANET DOES NOT HAVE A PERMANENT LABEL
				{
					// CALCULATE THE TOTAL DISTANCE FROM STARTING POINT

					int totalDistance = Mathf.RoundToInt (dist+currentPlanet.Routes[i].Distance);
				
					if(tempDists[comparisonIndex] == -1)	// CHECK NO TEMPORARY DISTANCE EXISTS
					{
						tempDists[comparisonIndex] = totalDistance;
						tempIndices[temporaryLabels] = comparisonIndex;
						temporaryLabels ++;
					}
					else if(tempDists[comparisonIndex] > totalDistance) // CHECK NEW DISTANCE IS LESS THAN TOTAL
					{
						tempDists[comparisonIndex] = totalDistance;
						tempIndices[temporaryLabels] = comparisonIndex;
						temporaryLabels ++;
					}
				}
			}

			// COMPARE DISTANCES THAT HAVE BEEN ASSIGNED

			smallestTemp = tempDists[tempIndices[0]];
			smallestTempInd = tempIndices[0];

			for(int i = 0; i < temporaryLabels; i ++)
			{
				if(tempDists[tempIndices[i]] < smallestTemp)
				{
					smallestTempInd = tempIndices[i];
					smallestTemp = tempDists[smallestTempInd];
				}
			}
			   


			Debug.Log ("SHORTEST DISTANCE = " + smallestTemp);
			Debug.Log ("NEAREST PLANET = " + Directory.Systems[smallestTempInd].Name);

			currentIndex = smallestTempInd;
			currentPlanet = Directory.Systems[currentIndex];

			// PERMANENTLY LABEL

			Labels[currentIndex] = Label;
			Label ++;

			// REMOVE FROM TEMPORARY LABELS

			for(int i = 0; i < temporaryLabels; i ++)
			{
				if(tempIndices[i] == currentIndex)
				{
					for(int j = i; j < temporaryLabels-1; j ++)
					{
						tempIndices[j] = tempIndices[j+1];
					}
					temporaryLabels --;
				}

			}


			if(currentIndex == To.Index)
			{
				goalReached = true;
				minDistance = tempDists[To.Index];
			}



			if(Label > 200)
			{
				goalReached = true;
				ERROR = true;
			}

		}

		// WHEN GOAL REACHED REVERSE ENGINEER A PATH!
		if(!ERROR)
		{
			bool returnedToStart = false;

			string[] reversePath = new string[Label-1];

			int pathLength = 1;

			reversePath[0] = To.Name;

			Debug.Log ("MINIMUM DISTANCE = " + minDistance);

			int retraceDist = minDistance;

			int loopCount = 0;
			int nextStep = 0;
			while(!returnedToStart)
			{

				int stepLength = 0;

				loopCount ++;

				for(int i = 0; i < currentPlanet.Routes.Length; i ++)
				{
					Debug.Log("CURRENT PLANET = " +  currentPlanet.Name);

					int comparisonIndex = currentPlanet.Routes[i].nextPlanet(currentPlanet.Name).Index;

					Debug.Log("COMPARING "+  Directory.Systems[comparisonIndex].Name);

					Debug.Log ("TOTAL DISTANCE TO = " + tempDists[comparisonIndex]);
					Debug.Log ("RETRACE DISTANCE = " + retraceDist);
					if(retraceDist - Mathf.RoundToInt(currentPlanet.Routes[i].Distance) == tempDists[comparisonIndex])
					{
						Debug.Log ("ADD TO PATH");
						reversePath[pathLength] = Directory.Systems[comparisonIndex].Name;

						pathLength ++;
						nextStep = comparisonIndex;
						stepLength = Mathf.RoundToInt(currentPlanet.Routes[i].Distance);

						i = currentPlanet.Routes.Length;
					}
				}

				Debug.Log ("NEXT STEP INDEX = " + nextStep);
				Debug.Log ("NEXT PLANET = " + Directory.Systems[nextStep]);
				currentPlanet = Directory.Systems[nextStep];
				if(currentPlanet.Index == activePlanet.Index)
				{
					returnedToStart = true;
					Debug.Log ("Returned to Start!");
				}

				if(loopCount > 500)
				{
					returnedToStart = true;

					Debug.Log ("Cycled out!");
				}

				retraceDist -= stepLength;
			}


			RouteTo = new string[pathLength-1];

			routeLength = pathLength - 1;
			routeStep = 0;
			for(int i = 0; i < pathLength-1; i ++)
			{
				Debug.Log ("Path["+i+"] = " + reversePath[i]);
				RouteTo[pathLength-2-i] = reversePath[i];


			}




		}
		else
		{
			Debug.Log ("PATHFINDING TOOK TOO LONG!");
		}



		plotting = false;
		tabIndex = 0;
		subMenu = false;
	}


	void NullRoute()
	{
		routeLength = 1;
		routeStep = 0;
		RouteTo = new string[1];
		RouteTo[0] = "-";



	}
	// ===========
	//  SAVE GAME 
	// ===========

	void Save()
	{
		saveDrop ();
		saveMother ();
		SaveRoute();
		Directory.Save();
		TradeDirector.Save();
		PlayerPrefs.SetInt ("ActivePlanet", activePlanet.Index);

		PlayerPrefs.SetInt ("InProgress", 1);

		PlayerPrefs.Save ();

	}

	void Load()
	{
		loadDrop ();
		loadMother ();
		LoadRoute();
		Directory.Load ();
		TradeDirector.Load ();
		//activePlanet = Directory.GetPlanet (PlayerPrefs.GetString("Location"));
		activePlanet = Directory.Systems[PlayerPrefs.GetInt ("ActivePlanet")];
	}

	// ===================
	//  DROP SHIP ACTIONS 
	// ===================

	void newDropShip()
	{
		dropHullMax = 100;
		dropFuelMax = 1000;
		dropShipHull = 100;
		dropShipFuel = 1000;

		for(int i = 0; i < 12; i ++)
		{
			dropHold[i] = 0;

		}

		saveDrop ();

		newDropShipCost += 5000;

		continueChoice = false;
		orbiting = true;
		displayOn = true;

	}

	void repairDrop(int amount, ref int source)
	{

		if(dropShipHull+amount > dropHullMax)
		{
			amount = dropHullMax-dropShipHull;
		}

		if(amount*5 > source)
		{
			amount = Mathf.CeilToInt(source/5);
		}

		dropShipHull += amount;
		source -= amount*5;
	}

	void refuelDrop(int amount, ref int source)
	{

		// CANNOT EXCEED TOTAL FUEL CAPACITY

		if(dropShipFuel + amount > dropFuelMax)
		{
			amount = dropFuelMax-dropShipFuel;
		}

		// CAN'T USE MORE FUEL THAN PLAYER HAS

		if(amount > source)
		{
			amount = source;
		}

		Debug.Log ("Refuel amount = " + amount.ToString ());

		Debug.Log ("Pre-Fuel = " + dropShipFuel.ToString ());


		dropShipFuel += amount;
		source -= amount;

		Debug.Log ("Post Fuel = " + dropShipFuel.ToString ());


	}
	// PUBLICS

	public void setStats(int newFuel, int newHull)
	{
		dropShipFuel = newFuel;
		dropShipHull = newHull;
	}

	public void getStats(ref int setFuel, ref int setHull)
	{
		setFuel = dropShipFuel;
		setHull = dropShipHull;
	}



	// =====================
	//  MOTHER SHIP ACTIONS 
	// =====================


	void repairMother(int amount, ref int source)
	{
		if(motherShipHull+amount > motherHullMax)
		{
			amount = motherHullMax-motherShipHull;
		}
		
		if(amount*10 > source)
		{
			amount = Mathf.CeilToInt(source/10);
		}
		
		motherShipHull += amount;
		source -= amount*10;

		if(source < 0)
		{
			source = 0;
		}
	}


	void refuelMother(int amount, ref int source)
	{
		if(motherShipFuel + amount > motherFuelMax)
		{
			amount = motherFuelMax-motherShipFuel;
		}
		
		// CAN'T USE MORE FUEL THAN PLAYER HAS
		
		if(amount > source)
		{
			amount = source;
		}
		
		Debug.Log ("Refuel amount = " + amount.ToString ());
		
		Debug.Log ("Pre-Fuel = " + motherShipFuel.ToString ());
		
		
		motherShipFuel += amount;
		source -= amount;
		
		Debug.Log ("Post Fuel = " + motherShipFuel.ToString ());
	}


	// =====================
	//  STORE DATA FOR DROP
	// =====================

	void saveDrop()
	{
		PlayerPrefs.SetInt ("1_Capacity", dropShipCapacity);

		PlayerPrefs.SetInt("1_Fuel", dropShipFuel);
		PlayerPrefs.SetInt("FuelMax", dropFuelMax);

		PlayerPrefs.SetInt("1_Hull", dropShipHull);
		PlayerPrefs.SetInt ("DropHullMax", dropHullMax);

		for(int i = 0; i < 12; i ++)
		{
			PlayerPrefs.SetInt ("DropShip_"+i.ToString (), dropHold[i]);
		}

		PlayerPrefs.SetInt ("NewDropCost", newDropShipCost);
	}


	// =======================
	//  STORE DATA FOR MOTHER
	// =======================

	void saveMother()
	{
		PlayerPrefs.SetInt("Mother_Fuel", motherShipFuel);
		PlayerPrefs.SetInt ("MotherFuelMax", motherFuelMax);

		PlayerPrefs.SetInt ("Mother_Hull", motherShipHull);
		PlayerPrefs.SetInt ("MotherHullMax", motherHullMax);

		PlayerPrefs.SetInt("Mother_Efficiency", Efficiency);

		for(int i = 0; i < 12; i ++)
		{

			PlayerPrefs.SetInt ("MotherShip_"+i.ToString (), motherHold[i]);
		}

		PlayerPrefs.SetInt ("1_Credits", Credits);
		if(orbiting)
		{
			PlayerPrefs.SetInt ("Orbiting", 1);
		}
		else
		{
			PlayerPrefs.SetInt ("Orbiting", 0);
		}

	}

	void SaveRoute()
	{
		PlayerPrefs.SetInt("RouteLength", routeLength);
		PlayerPrefs.SetInt("RouteStep", routeStep);

		for(int i = 0; i < routeLength; i ++)
		{
			PlayerPrefs.SetString ("RouteStep"+i, RouteTo[i]);
		}

	}


	// =====================
	//  READ DATA FROM DROP
	// =====================

	void loadDrop()
	{
		dropShipCapacity = PlayerPrefs.GetInt ("1_Capacity");

		dropShipFuel = PlayerPrefs.GetInt ("1_Fuel");
		dropFuelMax = PlayerPrefs.GetInt ("DropFuelMax");

		dropShipHull = PlayerPrefs.GetInt ("1_Hull");
		dropHullMax = PlayerPrefs.GetInt ("DropHullMax");

		for(int i = 0; i < 12; i ++)
		{
			dropHold[i] = PlayerPrefs.GetInt ("DropShip_"+i.ToString ());
		}

		newDropShipCost = PlayerPrefs.GetInt ("NewDropCost");
	}

	// ======================
	//  READ DATA FOR MOTHER
	// ======================

	void loadMother()
	{

		motherShipFuel = PlayerPrefs.GetInt ("Mother_Fuel");
		motherFuelMax = PlayerPrefs.GetInt ("MotherFuelMax");

		motherShipHull = PlayerPrefs.GetInt ("Mother_Hull");
		motherHullMax = PlayerPrefs.GetInt ("MotherHullMax");

		Efficiency = PlayerPrefs.GetInt ("Mother_Efficiency");

		for(int i = 0; i < 12; i ++)
		{
			motherHold[i] = PlayerPrefs.GetInt ("MotherShip_"+i.ToString ());
		}

		if(PlayerPrefs.GetInt ("Orbiting") == 1)
		{
			orbiting = true;
		}
		else
		{
			orbiting = false;
		}
	}

	void LoadRoute()
	{
		routeLength = PlayerPrefs.GetInt ("RouteLength");
		routeStep = PlayerPrefs.GetInt ("RouteStep");

		RouteTo = new string[routeLength];

		for(int i = 0; i < routeLength; i ++)
		{
			RouteTo[i] = PlayerPrefs.GetString ("RouteStep"+i);

		}
	}

	// ========================
	//  CARGO EXCHANGE ACTIONS
	// ========================


	void exchangeButton(int amount, ref int From, ref int To)
	{
		exchangeButton(amount, ref From, ref To, TotalQuantities(dropHold) + amount);
	}

	void exchangeButton(int amount, ref int From, ref int To, int Limit)
	{
		Debug.Log ("Button Pressed");

		if(buttonReady)
		{
			Debug.Log ("Button Action");

			buttonReady = false;
			exchange(amount, ref From, ref To, Limit);
			delayTimer = buttonDelay;
		}
	}

	void exchange(int amount, ref int From, ref int To)
	{
		exchange (amount, ref From, ref To, TotalQuantities(dropHold)+amount);
	}

	void exchange(int amount, ref int From, ref int To, int Limit)
	{

		if(TotalQuantities(dropHold)+amount > Limit)
		{
			amount =  Limit - TotalQuantities(dropHold);
		}

		if(amount <= From)
		{
			From -= amount;
			To += amount;
		}
		else
		{
			To += From;
			From = 0;
		}
	}







	// ================
	//  MARKET ACTIONS 
	// ================

	void BuyMarket()
	{
		if(Credits >= TotalBuyValue())
		{
			Credits -= TotalBuyValue();
			for(int i = 0; i < 12; i ++)
			{
				activePlanet.hangar[i] += nQuantities[i];
				activePlanet.Stock[i] -= nQuantities[i];
				nQuantities[i] = 0;
			}
		}
	}

	void SellMarket()
	{
		Credits += TotalSellValue ();

		for(int i = 0; i < 12; i ++)
		{
			activePlanet.hangar[i] -= nQuantities[i];
			activePlanet.Stock[i] += nQuantities[i];

			nQuantities[i] = 0;
		}

	}


	void resetQuantities()
	{
		for(int i = 0; i < 12; i++)
		{
			nQuantities[i] = 0;
		}
	}

	int TotalBuyValue()
	{
		int total = 0;

		for(int i = 0; i < 12; i ++)
		{
			if(tabIndex == 3)
			{
				total += Mathf.CeilToInt (nQuantities[i]*activePlanet.buyValue(i));
			}
			else
			{
				total += Mathf.CeilToInt (nQuantities[i]*activePlanet.blackBuyValue(i));
			}
		
		
		}

		return total;
	}

	int TotalSellValue()
	{
		int total = 0;

		for(int i = 0; i < 12; i ++)
		{
			if(tabIndex == 3)
			{
				total += Mathf.FloorToInt(nQuantities[i]*activePlanet.sellValue(i));
			}
			else
			{

				total += Mathf.FloorToInt (nQuantities[i]*activePlanet.blackSellValue(i));
			}
		}

		return total;
	}

	// ============================

	int TotalQuantities(int[] commodSource)
	{
		int count = 0;

		if(commodSource.Length == 12)
		{
			for(int i = 0; i < 12; i ++)
			{
				count += commodSource[i];
			}

		}

		return count;

	}





	// =========================
	//  INITIATE DROP SHIP MODE
	// =========================

	void DropShipLaunch()
	{


		Debug.Log ("Launching Drop Ship!");

		//saveMother();

		//PlayerPrefs.SetInt ("1_Credits", Credits);

		PlayerPrefs.SetString ("GameType", "CAMPAIGN");
		PlayerPrefs.SetString ("StartFrom", "GROUND");
		//saveDrop ();

		/* PARAMS FROM PLANET */

		PlayerPrefs.SetInt ("Drop_Height", 100);
		PlayerPrefs.SetInt ("Max_Wind", 0);

		//orbiting = true;


		//activePlanet.SaveCargo();

		Application.LoadLevelAdditive("DropMode");

		displayOn = false;

		//Application.LoadLevel("DropMode");

	}

	void DropShipDrop()
	{
		Debug.Log ("Dropping Drop Ship");

		//saveMother ();

		PlayerPrefs.SetString ("GameType", "CAMPAIGN");
		PlayerPrefs.SetString ("StartFrom", "ORBIT");
		//saveDrop();
		/* PARAMS FROM PLANET */

		PlayerPrefs.SetInt ("Drop_Height", 100);
		PlayerPrefs.SetInt ("Max_Wind", 0);

		//orbiting = false;

		//Application.LoadLevel ("DropMode");

		Application.LoadLevelAdditive("DropMode");

		displayOn = false;
	}

	// =============== //
	//  TRAVEL DANGER  //
	// =============== //

	public void SetHullDamage(int newHull)
	{
		motherShipHull = newHull;

	}

	void RouteDanger(TradeRoute currentRoute)
	{
		int roll = Mathf.RoundToInt(Random.value*200);
		PlayerPrefs.SetString ("GameType", "CAMPAIGN");
		PlayerPrefs.SetInt ("Mother_Hull", motherShipHull);
		Debug.Log ("Roll: " + roll.ToString ());

		saveMother ();
		Debug.Log ("PirateThresh = " + currentRoute.PirateActivity.ToString ());
		Debug.Log("AsteroidThresh = " + (currentRoute.PirateActivity + currentRoute.AsteroidDensity).ToString ());
		if(roll <= currentRoute.PirateActivity)
		{
			// PIRATE ATTACK
			Debug.Log ("Load battle");
			PlayerPrefs.SetInt ("PirateActivity", Mathf.RoundToInt(currentRoute.PirateActivity));

			Application.LoadLevelAdditive("Battle");
			displayOn = false;
		}
		else if(roll > currentRoute.PirateActivity && roll < currentRoute.PirateActivity + currentRoute.AsteroidDensity)
		{
			// ENCOUNTER ASTEROID FIELD
			Debug.Log ("Load Asteroids");

			PlayerPrefs.SetInt ("AsteroidDensity", Mathf.RoundToInt(currentRoute.AsteroidDensity));
			Application.LoadLevelAdditive ("AsteroidField");
			displayOn = false;
		}
		


	}


	//============//
	// NEW PLANET //
	//============//

	void Travel(/*Planet newPlanet, int dist*/ TradeRoute elvenPath)
	{
		jumps ++;

		pathIndex = 0;
		RouteDanger (elvenPath);
		Planet newPlanet = elvenPath.nextPlanet(activePlanet.name);
		elvenPath.BoostRisk();
		elvenPath.Traversals ++;



		//activePlanet.Volatility();
		newPlanet.Restock();

		//PlayerPrefs.SetString ("Location", newPlanet.Name);

		motherShipFuel -= Mathf.CeilToInt(elvenPath.Distance/Efficiency);
		PlayerPrefs.SetInt ("Mother_Fuel", motherShipFuel);
		activePlanet = newPlanet;

		if(RouteTo[0] != "-")
		{

			if(RouteTo[routeStep] == newPlanet.Name)
			{

				if(routeStep + 1 == routeLength)
				{
					NullRoute ();
				}
				else
				{
					routeStep ++;
				}

			}
			else
			{
				NullRoute();
			}

		}

		Directory.Cycles ++;
		TradeDirector.Cycles ++;

		travelling = false;
		travelCount = 0;
	}



	// PUBLICS

	public void SetOrbit(bool orbitOn)
	{
		if(orbitOn != orbiting)
		{
			if(orbitOn)
			{
				activePlanet.DropHeight += 200;
			}
			else
			{
				CustomsCheck();
			}

		}

		orbiting = orbitOn;
	}




	// ============================================
	//  MAIN STUFF HERE, UNFORTUNATELY IN GUI LOOP
	// ============================================



	void OnGUI()
	{

		if(displayOn)
		{

			// -----------------------------------------------
			// IF A MARKET TAB HAS BEEN LEFT, RESET QUANTITIES
			// -----------------------------------------------
			if(prevMark != markIndex || prevIndex != tabIndex)
			{
				resetQuantities();
				prevMark = markIndex;
				prevIndex = tabIndex;
			}
			//------------------------------------------------

			// =================
			//  COMMON ELEMENTS
			// =================

			// TABS:
			if(!subMenu)
			{
				tabIndex = GUI.SelectionGrid(new Rect(5f, 5f, Screen.width-10, 30), tabIndex, tabs, 5, campaignStyle);

				// DISPLAY: CURRENT LOCATION
				//          CREDIT BALANCE

				GUI.Label (new Rect(15f, 40f, Screen.width-50, 30), "System: " + activePlanet.Name, bodyStyle);
				GUI.Label (new Rect(15f, 70f, Screen.width-50, 30), "Credits: " + Credits, bodyStyle);
			}
			// =================================
			//  SWITCH FOR INDIVIDUAL TAB MENUS
			// =================================

			switch(tabIndex)
			{

			case 0:


				// ======== \\
				//  BRIDGE  \\
				// ======== \\


				if(orbiting)
				{



					// DISPLAY: MOTHER SHIP HULL & FUEL

					GUI.Label (new Rect(Screen.width/2-100, 40f, Screen.width, 30), "Mother Ship Fuel: " + motherShipFuel.ToString (), bodyStyle);
					GUI.Label (new Rect(Screen.width/2-100, 70f, Screen.width, 30), "Mother Ship Hull: " + motherShipHull.ToString(), bodyStyle);

					// DESTINATIONS
					//GUI.Label (new Rect(15f, 100f, Screen.width-50, 30), "Plot Course: ", bodyStyle);

					GUI.Box(new Rect(15f, 100f, 200, 30), "NAME", campaignStyle); 
					GUI.Box(new Rect(230, 100f, 200, 30), "DISTANCE", campaignStyle);
					GUI.Box (new Rect(460, 100f, 200, 30), "PIRATE ACTIVITY", campaignStyle);
					GUI.Box (new Rect(680, 100f, 200, 30), "ASTEROID RISK", campaignStyle);

					pathIndex = GUI.SelectionGrid (new Rect(15, 135, 200, 35*activePlanet.Routes.Length), pathIndex, activePlanet.Destinations(), 1, campaignStyle);

					for(int i = 0; i < activePlanet.Routes.Length; i ++)
					{
						GUI.Label(new Rect(230, 135+35*i, 200, 35), activePlanet.Routes[i].Distance.ToString (), gridStyle);
						GUI.Label (new Rect(460, 135+35*i, 200, 35), activePlanet.Routes[i].PirateRisk(), gridStyle);
						GUI.Label (new Rect(680, 135+35*i, 200, 35), activePlanet.Routes[i].AsteroidRisk(), gridStyle);
					}

					if(activePlanet.Routes[pathIndex].Distance/Efficiency > motherShipFuel)
					{
						inRange = false;
					}
					else
					{
						inRange = true;
					}


					GUI.Label (new Rect(15f, 455f, Screen.width/2, 30), "COURSE SET: " +RouteTo[routeLength-1], bodyStyle);
					if(routeLength > 0)
					{
						GUI.Label (new Rect(Screen.width/2+15, 455, Screen.width/2, 30), "NEXT STEP: " + RouteTo[routeStep], bodyStyle);
					}

					if(GUI.Button (new Rect(Screen.width/4-100, 555, 200, 30), "PLANETS LIST", campaignStyle))
					{
						tabIndex = 11;
						subMenu = true;


					}

					if(GUI.Button (new Rect(Screen.width*3/4-100, 555, 200, 30), "PLANET INFO", campaignStyle))
					{
						viewPlanet = activePlanet.Routes[pathIndex].nextPlanet(activePlanet.name);
						tabIndex = 10;
						subMenu = true;
						returnToIndex = 0;
					}

					if(!travelling)
					{
						if(inRange)
						{
							if(GUI.Button (new Rect(Screen.width/2-100, 555, 200, 30), "SET FORTH", campaignStyle))
							{
								Debug.Log ("GO!");
								travelling = true;
							}
						}
						else
						{
							GUI.Label (new Rect(Screen.width/2-100, 555, 200, 30), "INSUFFICIENT FUEL", gridStyle);
						}
					}
					else
					{

						GUI.Label (new Rect(Screen.width/2-100, 555, 200, 30), "VOYAGING...", gridStyle);
						if(travelCount > 100)
						{
							Travel (activePlanet.Routes[pathIndex]);
						}
						else
						{
							travelCount ++;
						}
					}

				}
				else
				{
					// NOT IN ORBIT, CANNOT ACCESS BRIDGE

					GUI.Label (new Rect(Screen.width/2-240, Screen.height/2-30, 480, 60), "MUST BE IN ORBIT", warningStyle);

				}

				break;

			case 1:

				// ============ \\
				//  CARGO HOLD  \\
				// ============ \\


				// DISPLAY: DROP SHIP FUEL & HULL

				GUI.Label (new Rect(Screen.width/2-100, 40f, Screen.width, 30), "Drop Ship Fuel: " + dropShipFuel.ToString (), bodyStyle);
				GUI.Label (new Rect(Screen.width/2-100, 70f, Screen.width, 30), "Drop Ship Hull: " + dropShipHull.ToString (), bodyStyle);

				if(orbiting)
				{
					// OPTIONS FOR CHANGING CARGO BETWEEN MOTHER/DROP


					// COLUMN HEADINGS FOR CARGO HOLDS

					GUI.Box (new Rect(250f, 100f, 200f, 30f), "DROP SHIP", campaignStyle);
					GUI.Box (new Rect(600f, 100f, 200f, 30f), "MOTHER SHIP", campaignStyle);
					  

					for(int i = 0; i < 12; i ++)  // CYCLE THROUGH QUANTITIES
					{
						// DISPLAY: COMMODITY NAME
						//          AMOUNT IN DROP SHIP
						//          AMOUNT IN MOTHER SHIP

					    GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle); 
						GUI.Label (new Rect(250f, 135f+35*i, 200f, 30), dropHold[i].ToString (), gridStyle);
						GUI.Label (new Rect(600f, 135f+35*i, 200f, 30), motherHold[i].ToString (), gridStyle);


						//-------------------------------------------------------------------------------------
						// EXCHANGE BUTTONS
						//-------------------------------------------------------------------------------------
						if(GUI.RepeatButton (new Rect(475, 135+35*i, 40, 30), "<", campaignStyle))
						{
							// MOTHER TO DROP
							if(Input.GetMouseButton(1))
							{
								exchange(motherHold[i], ref motherHold[i], ref dropHold[i], dropShipCapacity);
							}
							else
							{
								exchangeButton(50, ref motherHold[i], ref dropHold[i], dropShipCapacity);
							}
						}
						if(GUI.RepeatButton(new Rect(535, 135+35*i, 40, 30), ">", campaignStyle))
						{
							// DROP TO MOTHER
							if(Input.GetMouseButton(1))
							{
								exchange (dropHold[i], ref dropHold[i], ref motherHold[i]);
							}
							else
							{
								exchangeButton (50, ref dropHold[i], ref motherHold[i]);
							}
						}

						//------------------------------------------------------------------------------------
					}

					// DISPLAY TOTAL CAPACITY OF CARGO IN DROP/DROP CAPACITY & MOTHER
					// 														* * NO LIMIT TO MOTHER CAPACITY * *
			

					GUI.Label (new Rect(25f, 555f, 200, 30), "CAPACITY", gridStyle);
					GUI.Label (new Rect(250f, 555f, 200f, 30), TotalQuantities(dropHold).ToString() + "/"+ dropShipCapacity.ToString (), gridStyle);
					GUI.Label (new Rect(600, 555, 200, 30), TotalQuantities(motherHold).ToString (), gridStyle); 

					//--------------------------------------------------------------------------------
					// LAUNCH DROP SHIP BUTTON
					//--------------------------------------------------------------------------------

					GUI.Label(new Rect(Screen.width-280, 70, 270, 30), "DROP HEIGHT: " +activePlanet.DropHeight, gridStyle);

					if(GUI.Button(new Rect(Screen.width-280, 40, 270, 30), "LAUNCH", campaignStyle))
					{
						DropShipDrop();
					}

					//-------------------------------------------------------------------------------
				}
				else
				{
					// =========================
					//  SHOW DROP SHIP CONTENTS
					// =========================

					/// HEADINGS: DROP SHIP    HANGAR

					GUI.Box (new Rect(250f, 100f, 200f, 30f), "DROP SHIP", campaignStyle);
					GUI.Box (new Rect(600f, 100f, 200f, 30f), "HANGAR", campaignStyle);
					
					
					for(int i = 0; i < 12; i ++)	// CYCLE THROUGH COMMODITIES
					{

						// DISPLAY: COMMODITY NAME
						//	        AMOUNT IN DROP SHIP
						//          AMOUNT IN HANGAR

						GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle);
						GUI.Label (new Rect(250f, 135f+35*i, 200f, 30), dropHold[i].ToString (), gridStyle);
						GUI.Label (new Rect(600f, 135f+35*i, 200f, 30), activePlanet.hangar[i].ToString (), gridStyle);

						//------------------
						// EXCHANGE BUTTONS
						//------------------
						//----------------------------------------------------------------------------------------
						if(GUI.RepeatButton (new Rect(475, 135+35*i, 40, 30), "<", campaignStyle))
						{
							// HANGAR TO DROP
							if(Input.GetMouseButton (1))
							{
								exchange (activePlanet.hangar[i], ref activePlanet.hangar[i], ref dropHold[i], dropShipCapacity);

							}
							else
							{
								exchangeButton (50, ref activePlanet.hangar[i], ref dropHold[i], dropShipCapacity);
							}
							
						}
						if(GUI.RepeatButton(new Rect(535, 135+35*i, 40, 30), ">", campaignStyle))
						{
							// DROP TO HANGAR
							if(Input.GetMouseButton (1))
							{
								exchange(dropHold[i], ref dropHold[i], ref activePlanet.hangar[i]);
							}
							else
							{
								exchangeButton(50, ref dropHold[i], ref activePlanet.hangar[i]);
							}
						}
						//----------------------------------------------------------------------------------------
						
					}

					// TOTAL CAPACITY IN DROP SHIP & HANGAR

					// NOTE: HANGAR CAPACITY INFINITE

					GUI.Label (new Rect(25f, 555f, 200, 30), "CAPACITY", gridStyle);
					GUI.Label (new Rect(250f, 555f, 200f, 30), TotalQuantities(dropHold).ToString() + "/"+dropShipCapacity.ToString (), gridStyle);
					GUI.Label (new Rect(600, 555, 200, 30), TotalQuantities(activePlanet.hangar).ToString (), gridStyle); 

					// =========================
					//  LAUNCH DROP SHIP BUTTON
					// =========================

					if(GUI.Button(new Rect(Screen.width-200, 55, 160, 30), "LAUNCH", campaignStyle))
					{
						DropShipLaunch();
					}
				}

				break;

			case 2:

				// ============= \\
				//  ENGINEERING  \\
				// ============= \\


				// BOTH DECK & PLANETSIDE OPTIONS SHOW DROP SHIP

				// * * CANNOT CHANGE MOTHER SHIP FROM PLANET * * 

				// HEADINGS: DROP SHIP	**FUEL TYPE WARNING** 

				// SIDINGS: HULL
				// 	        FUEL

				GUI.Box (new Rect(135f, 110f, 250f, 30f), "DROP SHIP", campaignStyle);
				GUI.Label (new Rect(400, 110, 250, 30f), "TAKES LIGHT FUEL", gridStyle);
				//GUI.Box (new Rect(400f, 100f, 250f, 30f), "MOTHER SHIP", campaignStyle);
				GUI.Box (new Rect(25f, 145f, 100f, 30), "HULL", campaignStyle);
				GUI.Box (new Rect(25f, 180f, 100f, 30), "FUEL", campaignStyle);

				//----------------------------------------------------------------------------------
				// REPAIR BUTTONS
				//----------------------------------------------------------------------------------

				if(GUI.Button (new Rect(400, 145, 295, 30), "REPAIR 10 (50 METAL)", campaignStyle))
				{
					Debug.Log ("REPAIRS!");
					if(orbiting)
					{
						repairDrop(10, ref motherHold[6]);
					}
					else
					{
						repairDrop(10, ref activePlanet.hangar[6]);
					}


				}
				if(GUI.Button (new Rect(700, 145, 200, 30), "REPAIR MAX", campaignStyle))
				{
					Debug.Log ("FULL REPAIR!");

					if(orbiting)
					{
						repairDrop(dropHullMax, ref motherHold[6]);
					}
					else
					{
						repairDrop(dropHullMax, ref activePlanet.hangar[6]);
					}
				}
				//----------------------------------------------------------------------------------


				//----------------------------------------------------------------------------------
				// REFUEL BUTTONS
				//----------------------------------------------------------------------------------

				if(GUI.Button (new Rect(400, 180, 295, 30), "REFUEL 10", campaignStyle))
				{
					Debug.Log ("PARTIAL REFUEL");
					if(orbiting)
					{
						refuelDrop(10, ref motherHold[4]);
					}
					else
					{
						refuelDrop(10, ref activePlanet.hangar[4]);
					}

				}
				if(GUI.Button (new Rect(700, 180, 200, 30), "REFUEL MAX", campaignStyle))
				{
					Debug.Log ("FULL REFUEL");

					if(orbiting)
					{
						refuelDrop (dropFuelMax, ref motherHold[4]);
					}
					else
					{
						refuelDrop (dropFuelMax, ref activePlanet.hangar[4]);
					}

				}
				//---------------------------------------------------------------------------------




				// DISPLAY: FUEL TANK & HULL INTEGRITY
				
				GUI.Label (new Rect(135f, 180f, 250f, 30), dropShipFuel.ToString () + "/" + dropFuelMax.ToString (), gridStyle);
				GUI.Label (new Rect(135f, 145f, 250f, 30), dropShipHull.ToString () + "/" + dropHullMax.ToString (), gridStyle);




				if(orbiting)
				{
					// ENGINEERING SHIP SIDE, REPAIRS FOR METAL AND REFUELING FOR FUEL FOR DROP & MOTHER

					// HEADINGS & SIDINGS FOR MOTHER SHIP 

					GUI.Box (new Rect(135f, 245f, 250f, 30f), "MOTHER SHIP", campaignStyle);
					GUI.Label(new Rect(400, 245, 250, 30), "TAKES HEAVY FUEL", gridStyle);
					GUI.Box (new Rect(25f, 280f, 100f, 30), "HULL", campaignStyle);
					GUI.Box (new Rect(25f, 315f, 100f, 30), "FUEL", campaignStyle);

					//---------------------------------------------------------------------------------------
					// REPAIR BUTTONS 
					//---------------------------------------------------------------------------------------

					if(GUI.Button (new Rect(400, 280, 295, 30), "REPAIR 100 (1000 METAL)", campaignStyle))
					{
						Debug.Log ("Partial Mother Repair");
						repairMother(100, ref motherHold[6]);
					}
					if(GUI.Button (new Rect(700, 280, 200, 30), "REPAIR MAX", campaignStyle))
					{
						Debug.Log ("Full mother repair");
						repairMother (motherHullMax, ref motherHold[6]);
					}

					//-------------------------------------------------------------------------------------
					// REFUEL BUTTONS
					//-------------------------------------------------------------------------------------

					if(GUI.Button (new Rect(400, 315, 295, 30), "REFUEL 100", campaignStyle))
					{
						Debug.Log ("Partial Mother Refuel");
						refuelMother(100, ref motherHold[5]);

					}
					if(GUI.Button (new Rect(700, 315, 200, 30), "REFUEL MAX", campaignStyle))
					{
						Debug.Log ("Full mother refuel");
						refuelMother(motherFuelMax, ref motherHold[5]);

					}

					//------------------------------------------------------------------------------------


					// DISPLAY: FUEL TANK & HULL INTEGRITY

					GUI.Label (new Rect(135f, 280, 250f, 30), motherShipHull.ToString () + "/" + motherHullMax.ToString (), gridStyle);
					GUI.Label (new Rect(135f, 315f, 250f, 30), motherShipFuel.ToString () + "/" + motherFuelMax.ToString (), gridStyle);



					// ====================================
					//  SHOW USEFUL COMMODITIES W/ AMOUNTS
					// ====================================


					// METAL

					GUI.Box ( new Rect(25f, 460f, 250f, 30), "METAL", campaignStyle);
					GUI.Label (new Rect(300f, 460, 250, 30), motherHold[6].ToString(), gridStyle); 

					// LIGHT FUEL

					GUI.Box (new Rect(25f, 495f, 250f, 30), "LIGHT FUEL", campaignStyle);
					GUI.Label (new Rect(300f, 495f, 250f, 30), motherHold[4].ToString (), gridStyle);

					// HEAVY FUEL

					GUI.Box (new Rect(25f, 530f, 250f, 30), "HEAVY FUEL", campaignStyle);
					GUI.Label (new Rect(300f, 530, 250f, 30), motherHold[5].ToString (), gridStyle);




				}
				else
				{
					// =======================================
					//  DISPLAY USEFUL COMMODITIES W/ AMOUNTS
					// =======================================

					// METAL

					GUI.Box ( new Rect(25f, 460f, 250f, 30), "METAL", campaignStyle);
					GUI.Label (new Rect(300f, 460, 250, 30), activePlanet.hangar[6].ToString(), gridStyle); 

					// LIGHT FUEL

					GUI.Box (new Rect(25f, 495f, 250f, 30), "LIGHT FUEL", campaignStyle);
					GUI.Label (new Rect(300f, 495f, 250f, 30), activePlanet.hangar[4].ToString (), gridStyle);

					if(activePlanet.upgrades.Length != 0)
					{
						if(activePlanet.upgrades[0].CanUpgrade() > -1)
						{
							string disp = activePlanet.upgrades[0].DisplayUpgade();
	                               
							GUI.Label (new Rect(315f, 280, 800, 30), disp, bodyStyle);
							if(activePlanet.upgrades[0].CanUpgrade () == 1)
							{
								if(GUI.Button (new Rect(25, 280, 250, 30), "BUY UPGRADE", campaignStyle))
								{
									activePlanet.upgrades[0].performUpgrade();	
								}
							}
							else
							{
								GUI.Label (new Rect(25, 280, 250, 30), "SHIP INCOMPATIBLE", campaignStyle);
							}
						}
					}


				}






				break;


			case 3:

				// ======== \\
				//  MARKET  \\
				// ======== \\



				if(orbiting)
				{
					// SHOW RATES

					// HEADINGS: BUY PRICE
					//           SELL PRICE

					GUI.Box(new Rect(230f, 100f, 150f, 30f), "BUY PRICE", campaignStyle);
					GUI.Box (new Rect(400f, 100f, 150f, 30f), "SELL PRICE", campaignStyle);

					for(int i = 0; i < 12; i ++) // CYCLE THROUGH COMMODITIES
					{

						// LIST COMMODITY NAMES

						GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle);
						if(!activePlanet.Embargoed[i])
						{
							// LIST BUY PRICES

							GUI.Label (new Rect(230f, 135+35*i, 150f, 30f), activePlanet.buyValue(i).ToString ("F2"), gridStyle);

							// LIST SELL PRICES

							GUI.Label (new Rect(400f, 135+35*i, 150f, 30f), activePlanet.sellValue(i).ToString("F2"), gridStyle);
						}
						else
						{
							GUI.Label (new Rect(230f, 135+35*i, 320f, 30f), "EMBARGOED", gridStyle);
						}

					}

				}
				else
				{
					// ==========================
					//  MARKET BUY/SELL SUB TABS 
					// ==========================

					markIndex = GUI.SelectionGrid(new Rect(300, 55, 400, 30), markIndex, marketTabs, 2, campaignStyle); 



					// HEADINGS: HANGAR (STOCK)
					//			 MARKET (STOCK)
					//           CREDITS PER UNIT
					//           HOW MUCH YOU WANT TO TRADE


					GUI.Box (new Rect(230f, 100f, 150f, 30f), "YOUR HANGAR", campaignStyle);
					GUI.Box (new Rect(400f, 100f, 150f, 30f), "MARKET", campaignStyle);

					GUI.Box (new Rect(570, 100f, 150f, 30f), "C/UNIT", campaignStyle);

					GUI.Box (new Rect(760f, 100f, 150f, 30f), "QUANTITY", campaignStyle);
					//GUI.Box (new Rect(


					// SHOP MENU FOR LEGIT MARKET
					for(int i = 0; i < 12; i ++) // CYCLE THROUGH COMMODITIES
					{

						// DISPLAY COMMODITY NAME

						GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle);
						 
						// DISPLAY HANGAR & PLANET STOCK

						GUI.Label (new Rect(230, 135+35*i, 150, 30), activePlanet.hangar[i].ToString (), gridStyle);
						if(!activePlanet.Embargoed[i])
						{
							GUI.Label (new Rect(400, 135+35*i, 150, 30), activePlanet.Stock[i].ToString (), gridStyle);
						}
						else
						{
							GUI.Label (new Rect(400, 135+35*i, 150, 30), "0", gridStyle);
						}

						// DISPLAY CREDITS PER UNIT

						if(markIndex == 0) // BUYING
						{
							if(!activePlanet.Embargoed[i])
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), activePlanet.buyValue(i).ToString ("F2"), gridStyle);
							}
							else
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), "-", gridStyle);

							}
						}
						else // SELLING
						{
							if(!activePlanet.Embargoed[i])
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), activePlanet.sellValue(i).ToString ("F2"), gridStyle);
							}
							else
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), "-", gridStyle);

							}
						}
						//---------------------------------------------------------------------
						// INCREASE/DECREASE BUTTONS
						//---------------------------------------------------------------------
						if(GUI.Button (new Rect(725, 135f+35*i, 30, 30), "<", campaignStyle))
						{
							nQuantities[i] -= 10;
						}
						if(GUI.Button(new Rect(915, 135+35*i, 30, 30), ">", campaignStyle))
						{
							nQuantities[i] += 10;
	                    }
						//--------------------------------------------------------------------


						// =============================
						//  TEXT FIELD QUANTITY EDITING
						// =============================

						// GUI TEXT FIELD SHOWING CURRENT TRADE AMOUNT

						tempString = GUI.TextField (new Rect(760, 135+35*i, 150, 30), nQuantities[i].ToString (), gridStyle);

						// TEMPORARY NUMERICAL VALUE
						int numVal = 0;

						if(int.TryParse(tempString, out numVal)) // FIELD CONTENTS IS A NUMBER
						{
							// ASSIGN TEMPORARY VALUE

							if(numVal < 0)
							{
								numVal = 0;
							}

							nQuantities[i] = numVal;

							// QUANTITY CAN'T BE LESS THAN ZERO

							if(nQuantities[i] < 0 || activePlanet.Embargoed[i] == true)
							{
								nQuantities[i] = 0;
							}
						
							if(markIndex == 0) // BUYING
							{
								// QUANTITY CAN'T BE MORE THAN THE MARKET HAS TO SELL

								if(nQuantities[i] > activePlanet.Stock[i])
								{
									nQuantities[i] = Mathf.RoundToInt ( activePlanet.Stock[i]);
								}

							
							}
							else // SELLING
							{

								// QUANTITY CAN'T BE MORE THAN PLAYER HAS TO SELL

								if(nQuantities[i] > activePlanet.hangar[i])
								{
									nQuantities[i] = Mathf.RoundToInt(activePlanet.hangar[i]);
								}
							}
						}
						else // ZERO DAT SHIT					
						{
							nQuantities[i] = 0;
						}



					}

					// DISPLAY TOTAL COST/SELL AMOUNT

					GUI.Box (new Rect(235, 555, 150, 30), "CREDITS", campaignStyle);

					if(markIndex == 0) // BUYING
					{
						priceString = TotalBuyValue().ToString ();
					}
					else // SELLING
					{
						priceString = TotalSellValue().ToString();
					}


					// DISPLAY AMOUNT

					GUI.Label (new Rect(400, 555, 150, 30), priceString, gridStyle);


					// SWITCH FOR BUY/SELL SPECIFICS

					switch(markIndex)
					{

					case 0:

						// BUY BUTTON

						if(GUI.Button(new Rect(760f, 555f, 150f, 30), "BUY", campaignStyle))
						{
							// MUST HAVE ENOUGH CREDITS

							if(Credits >= TotalBuyValue())
							{
								BuyMarket ();
							}
						}

						break;


					case 1:

						// SELL BUTTON

						if(GUI.Button (new Rect(760f, 555f, 150f, 30), "SELL", campaignStyle))
						{
							SellMarket();
						}


						break;
					}



				}



				break;

			case 4: // BLACK MARKET

				if(orbiting)
				{
					// MUST BE ON GROUND
					warningStyle.fontSize = 24;
					warningStyle.alignment = TextAnchor.MiddleCenter;
					GUI.Label (new Rect(Screen.width/2-240, Screen.height/2-30, 480, 60), "MUST BE ON PLANET SURFACE", warningStyle);


				}
				else
				{
					markIndex = GUI.SelectionGrid(new Rect(300, 55, 400, 30), markIndex, marketTabs, 2, campaignStyle); 


					GUI.Box (new Rect(230f, 100f, 150f, 30f), "YOUR HANGAR", campaignStyle);
					GUI.Box (new Rect(400f, 100f, 150f, 30f), "MARKET", campaignStyle);
					
					GUI.Box (new Rect(570, 100f, 150f, 30f), "C/UNIT", campaignStyle);
					
					GUI.Box (new Rect(760f, 100f, 150f, 30f), "QUANTITY", campaignStyle);

					// SHOP MENU FOR SLIGHTLY LESS LEGIT MARKET

					for(int i = 0; i < 12; i ++) // CYCLE THROUGH COMMODOTIES
					{

						GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle);

						
						GUI.Label (new Rect(230, 135+35*i, 150, 30), activePlanet.hangar[i].ToString (), gridStyle);
						GUI.Label (new Rect(400, 135+35*i, 150, 30), activePlanet.blackSupply(i).ToString (), gridStyle);
						
						// DISPLAY CREDITS PER UNIT
						
						if(markIndex == 0) // BUYING
						{

							if(activePlanet.Embargoed[i])
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), activePlanet.blackBuyValue(i).ToString ("F2"), gridStyle);
							}
							else
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), "-", gridStyle);

							}
						}
						else // SELLING
						{
							if(activePlanet.Embargoed[i])
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), activePlanet.blackSellValue(i).ToString ("F2"), gridStyle);
							}
							else
							{
								GUI.Label (new Rect(570, 135+35*i, 150, 30), "-", gridStyle);
							}
						}
						//---------------------------------------------------------------------
						// INCREASE/DECREASE BUTTONS
						//---------------------------------------------------------------------
						if(GUI.Button (new Rect(725, 135f+35*i, 30, 30), "<", campaignStyle))
						{
							nQuantities[i] -= 10;
						}
						if(GUI.Button(new Rect(915, 135+35*i, 30, 30), ">", campaignStyle))
						{
							nQuantities[i] += 10;
						}
						//--------------------------------------------------------------------
						
						
						// =============================
						//  TEXT FIELD QUANTITY EDITING
						// =============================
						
						// GUI TEXT FIELD SHOWING CURRENT TRADE AMOUNT
						
						tempString = GUI.TextField (new Rect(760, 135+35*i, 150, 30), nQuantities[i].ToString (), gridStyle);
						
						// TEMPORARY NUMERICAL VALUE
						int numVal = 0;
						
						if(int.TryParse(tempString, out numVal)) // FIELD CONTENTS IS A NUMBER
						{
							// ASSIGN TEMPORARY VALUE
							
							nQuantities[i] = numVal;
							
							// QUANTITY CAN'T BE LESS THAN ZERO
							
							if(nQuantities[i] < 0 || activePlanet.Embargoed[i] != true)
							{
								nQuantities[i] = 0;
							}
							
							if(markIndex == 0) // BUYING
							{
								// QUANTITY CAN'T BE MORE THAN THE MARKET HAS TO SELL
								
								if(nQuantities[i] > activePlanet.blackSupply(i))
								{
									nQuantities[i] = Mathf.RoundToInt ( activePlanet.blackSupply(i));
								}
								
								
							}
							else // SELLING
							{
								
								// QUANTITY CAN'T BE MORE THAN PLAYER HAS TO SELL
								
								if(nQuantities[i] > activePlanet.hangar[i])
								{
									nQuantities[i] = Mathf.RoundToInt(activePlanet.hangar[i]);
								}
							}
						}
						else // ZERO DAT SHIT					
						{
							nQuantities[i] = 0;
						}

					}

					// DISPLAY TOTAL COST/SELL AMOUNT
					
					GUI.Box (new Rect(235, 555, 150, 30), "CREDITS", campaignStyle);
					
					if(markIndex == 0) // BUYING
					{
						priceString = TotalBuyValue().ToString ();
					}
					else // SELLING
					{
						priceString = TotalSellValue().ToString();
					}
					
					
					// DISPLAY AMOUNT
					
					GUI.Label (new Rect(400, 555, 150, 30), priceString, gridStyle);
					
					
					// SWITCH FOR BUY/SELL SPECIFICS
					
					switch(markIndex)
					{
						
					case 0:
						
						// BUY BUTTON
						
						if(GUI.Button(new Rect(760f, 555f, 150f, 30), "BUY", campaignStyle))
						{
							// MUST HAVE ENOUGH CREDITS
							
							if(Credits >= TotalBuyValue())
							{
								BuyMarket ();
							}
						}
						
						break;
						
						
					case 1:
						
						// SELL BUTTON
						
						if(GUI.Button (new Rect(760f, 555f, 150f, 30), "SELL", campaignStyle))
						{
							SellMarket();
						}
						
						
						break;
					}

				}



				break;

			case 10: // PLANET INFORMATION

				GUI.Label(new Rect(15f, 40f, Screen.width/2, 30), "Viewing System: " + viewPlanet.Name, bodyStyle);

				GUI.Label (new Rect(Screen.width/2+120, 40f, Screen.width/2-30, 30), "Current System: " + activePlanet.Name, bodyStyle); 


				GUI.Box(new Rect(230f, 100f, 150f, 30f), "BUY PRICE", campaignStyle);
				GUI.Box (new Rect(400f, 100f, 150f, 30f), "SELL PRICE", campaignStyle);

				GUI.Box (new Rect(Screen.width/2+120, 100f, 150f, 30f), "BUY PRICE", campaignStyle);
				GUI.Box (new Rect(Screen.width/2+290, 100f, 150f, 30f), "SELL PRICE", campaignStyle);
				

				for(int i = 0; i < 12; i ++) // CYCLE THROUGH COMMODITIES
				{

					// LIST COMMODITY NAMES
					
					GUI.Box (new Rect(25f, 135f+35*i, 200f, 30), commods[i], campaignStyle);
					
					// LIST BUY PRICES
					/*
					GUI.Label (new Rect(230f, 135+35*i, 150f, 30f), viewPlanet.buyValue(i).ToString (), gridStyle);
					
					// LIST SELL PRICES
					
					GUI.Label (new Rect(400f, 135+35*i, 150f, 30f), viewPlanet.sellValue(i).ToString(), gridStyle);
					*/


					if(!viewPlanet.Embargoed[i])
					{
						// LIST BUY PRICES

						GUI.Label (new Rect(230f, 135+35*i, 150f, 30f), viewPlanet.buyValue(i).ToString ("F2"), gridStyle);
						
						// LIST SELL PRICES
						
						GUI.Label (new Rect(400f, 135+35*i, 150f, 30f), viewPlanet.sellValue(i).ToString("F2"), gridStyle);
					}
					else
					{
						GUI.Label (new Rect(230f, 135+35*i, 320f, 30f), "EMBARGOED", gridStyle);
					}

					if(!activePlanet.Embargoed[i])
					{
						// LIST BUY PRICES
						
						GUI.Label (new Rect(Screen.width/2+120, 135+35*i, 150f, 30f), activePlanet.buyValue(i).ToString ("F2"), gridStyle);
						
						// LIST SELL PRICES
						
						GUI.Label (new Rect(Screen.width/2+290, 135+35*i, 150f, 30f), activePlanet.sellValue(i).ToString("F2"), gridStyle);
					}
					else
					{
						GUI.Label (new Rect(Screen.width/2+120, 135+35*i, 320f, 30f), "EMBARGOED", gridStyle);
					}


				}

				if(GUI.Button (new Rect(Screen.width/2-100, 555, 200, 30), "BACK", campaignStyle))
				{
					tabIndex = returnToIndex;
					if(returnToIndex == 0)
					{
						subMenu = false;
					}
				}

				break;

			case 11:

				subMenuIndex = GUI.SelectionGrid(new Rect(15, 15, Screen.width-30, 555-30), subMenuIndex, Directory.Names, 3, campaignStyle);

				if(GUI.Button (new Rect(Screen.width/4-100, 555, 200, 30), "BACK", campaignStyle))
				{
					tabIndex = 0;
					subMenu = false;
				}
				if(!plotting)
				{
					if(GUI.Button (new Rect(Screen.width/2-100, 555, 200, 30), "PLOT COURSE", campaignStyle))
					{
						plotting = true;
						StartCoroutine(StartNavComputer(Directory.Systems[subMenuIndex]));
						//tabIndex = 0;
						//subMenu = false;

					}
				}
				if(GUI.Button (new Rect(Screen.width*3/4-100, 555, 200, 30), "MORE INFO", campaignStyle))
				{
					returnToIndex = 11;
					tabIndex = 10;
					viewPlanet = Directory.Systems[subMenuIndex];
				}

				if(plotting)
				{
					GUI.Label (new Rect(Screen.width/2-100, 555, 200, 30), "PLOTTING...", campaignStyle);

				}

				break;


			}
		}
		else if(pauseMenu)
		{
			GUI.Label (new Rect(Screen.width/2-400, Screen.height/2-100, 800, 200), "PAUSED\n\nSPACE/A TO CONTINUE\n\nESC/START TO SAVE AND QUIT", warningStyle);

		}
		else if(continueChoice)
		{
			GUI.Label (new Rect(Screen.width/2-300, Screen.height/2-100, 600, 200), "BUY NEW DROP SHIP FOR " + newDropShipCost.ToString () + " CREDITS?", warningStyle);

			if(GUI.Button(new Rect(Screen.width/2-50, Screen.height/2+200, 100, 30), "YES", campaignStyle))
			{
				Credits -= newDropShipCost;
				newDropShip();

			}

			if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2+250, 100, 30), "NO", campaignStyle))
			{
				Application.LoadLevel ("GameOver");
			}


		}
		else if(victoryMessage)
		{
			GUI.Label (new Rect(Screen.width/2-300, Screen.height/2-100, 600, 200), "CONGRATULATIONS!\n\nYOU HAVE ESTABLISHED AN ECONOMICAL MAGUFFIUM BASED EMPIRE!\nCONTINUE?", warningStyle);
			
			if(GUI.Button(new Rect(Screen.width/2-50, Screen.height/2+200, 100, 30), "YES", campaignStyle))
			{
				hasWon = true;
				victoryMessage = false;
				displayOn = true;
				
			}
			
			if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2+250, 100, 30), "NO", campaignStyle))
			{
				Application.LoadLevel ("Menu");
			}
		}


	}

	// Use this for initialization
	void Start () 
	{	// =================================================
		// INITIALISE GUI STYLES
		// =================================================
		Time.timeScale = 1;
		warningStyle = new GUIStyle();

		warningStyle.font = campaignStyle.font;
		warningStyle.fontSize = 24;

		warningStyle.normal.background = null;
		warningStyle.normal.textColor = Color.white;

		warningStyle.wordWrap = true;

		warningStyle.alignment = TextAnchor.MiddleCenter;
		//warningStyle.onNormal.textColor = Color.white;

		bodyStyle = new GUIStyle();

		bodyStyle.font = campaignStyle.font;
		bodyStyle.fontSize = campaignStyle.fontSize;

		bodyStyle.normal.background = null;
		bodyStyle.normal.textColor = Color.white;

		bodyStyle.alignment = TextAnchor.MiddleLeft;

		gridStyle = new GUIStyle();

		gridStyle.font = campaignStyle.font;
		gridStyle.normal = campaignStyle.normal;
		gridStyle.normal.background = null;
		gridStyle.alignment = TextAnchor.MiddleCenter;
		gridStyle.fontSize = campaignStyle.fontSize;
		/*
		bigGridStyle = new GUIStyle();

		bigGridStyle.font = campaignStyle.font;
		bigGridStyle.normal = campaignStyle.normal;
		//bigGridStyle.normal.background = null;
		bigGridStyle.alignment = TextAnchor.MiddleCenter;
		bigGridStyle.fontSize = campaignStyle.fontSize;



		bigGridStyle.margin = campaignStyle.margin;
		bigGridStyle.margin.Add(new Rect(30, 0, 0, 15));
	*/
		//======================================================


		Debug.Log (PlayerPrefs.GetString ("LoadType"));

		if(PlayerPrefs.GetString ("LoadType") == "CONTINUE")
		{
			Load();

		}
		else
		{

			orbiting = true;
			int startDice = Mathf.CeilToInt (Random.value*36)-1;
			if(startDice < 0)
			{
				//Debug.Log ("Dice = " + startDice);

				startDice = 0;



			}
			if(startDice == 0 || startDice == 3 || startDice == 31)
			{
			//	Debug.Log ("Adjusting start planet");
				
				startDice = 11;
				
			}



			Debug.Log ("Start planet = " + Directory.Systems[startDice].Name);

			activePlanet = Directory.Systems[startDice];


		}


		//======================================================
		//  GET ORBIT STATUS
		//======================================================
		/*
		if(PlayerPrefs.GetString ("StartFrom") == "ORBIT")
		{
			orbiting = false;
		}
		else
		{
			orbiting = true;
		}
		*/
		//======================================================
		// GET DROP SHIP STATS
		//======================================================
		dropShipFuel = PlayerPrefs.GetInt ("1_Fuel");
		dropShipHull = PlayerPrefs.GetInt ("1_Hull");
		loadDrop();

		
		//======================================================
		// GET MOTHER SHIP STATS
		//======================================================
		loadMother();

		//======================================================
		// GET CAMPAIGN INFO
		//======================================================

		//activePlanet = Directory.GetPlanet (PlayerPrefs.GetString("Location"));

		Credits = PlayerPrefs.GetInt ("1_Credits");


		if(PlayerPrefs.GetInt("NewPlanet") == 1)
		{
			activePlanet.Restock ();
		}



	}
	
	// Update is called once per frame
	void Update () 
	{
		// ======================
		//  DELAY REPEAT BUTTONS
		// ======================
		if(!buttonReady)
		{
			Debug.Log ("Button off!\nCountdown = " + delayTimer.ToString ());

			delayTimer -= Time.deltaTime;
			if(delayTimer < 0)
			{
				Debug.Log ("Timer off!");
				buttonReady = true;
				delayTimer = 0;
			}
		}

		if(motherHold[11] >= 1000 && hasWon == false)
		{
			displayOn = false;
			victoryMessage = true;

		}

		if(Input.GetKeyDown (KeyCode.Escape) || Input.GetKeyDown (KeyCode.JoystickButton7))
		{
			if(!pauseMenu)
			{

				if(displayOn)
				{
					pauseMenu = true;
					displayOn = false;
				}
			}
			else
			{
				Debug.Log ("SAVING!");
				Save ();
				Application.LoadLevel ("Menu");
			}
		}

		if(Input.GetKeyDown (KeyCode.Space) || Input.GetKeyDown (KeyCode.JoystickButton0))
		{
			if(pauseMenu)
			{
				displayOn = true;
				pauseMenu = false;
			}
		}












	}
}
