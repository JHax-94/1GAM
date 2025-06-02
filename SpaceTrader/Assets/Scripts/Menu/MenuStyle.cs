using UnityEngine;
using System.Collections;

public class MenuStyle : MonoBehaviour {

	public GUIStyle menuStyle;

	public menuGUI MAIN_MENU;

	public NewGameOptions NEW_GAME;
	public QuickDropOptions QUICK_DROP;
	public QuickFightOptions QUICK_FIGHT;
	public QuickAsteroidsOptions QUICK_ASTEROID;
	public GameSettings SETTINGS;
	public Credits CREDITS;

	public bool Gamepad;

	public void SetInitialStats()
	{
		//PlayerPrefs.SetString ("StartFrom", "GROUND");
		//PlayerPrefs.SetString ("LoadType", "NEW");
        
		// SET PLAYERPREFS FOR NEW GAME

		PlayerPrefs.SetInt ("NewGame", 1);
		PlayerPrefs.SetString ("LoadType", "NEW");

		// CAMPAIGN SPECIFICS

		PlayerPrefs.SetInt ("1_Credits", 10000);
		PlayerPrefs.SetInt ("Orbiting", 1);
		//PlayerPrefs.SetString ("Location", "Earth");

		// DROP SHIP STATS

		PlayerPrefs.SetInt("1_Capacity", 5000);
		PlayerPrefs.SetInt("1_Fuel", 1000);
		PlayerPrefs.SetInt ("1_Hull", 100);
		PlayerPrefs.SetInt ("DropFuelMax", 1000);
		PlayerPrefs.SetInt ("DropHullMax", 100);

		PlayerPrefs.SetInt ("NewDropCost", 0);

		// MOTHER SHIP STATS

		PlayerPrefs.SetInt ("Mother_Fuel", 10000);
		PlayerPrefs.SetInt ("Mother_Hull", 10000);
		PlayerPrefs.SetInt ("MotherFuelMax", 10000);
		PlayerPrefs.SetInt ("MotherHullMax", 10000);

		PlayerPrefs.SetInt ("Mother_Efficiency", 10);

		// OTHER

		PlayerPrefs.SetInt ("NewPlanet", 1);

		// SET CARGO HOLDS

		for(int i = 0; i < 12; i ++)
		{
			PlayerPrefs.SetInt ("DropShip_"+i.ToString (), 0);
			PlayerPrefs.SetInt ("MotherShip_"+i.ToString (), 0);
		}

		PlayerPrefs.SetInt ("MotherShip_4", 1000);

		PlayerPrefs.Save ();

		Application.LoadLevel ("Galaxy");

	}



	public void SwitchMenu(int currentMenu, int newMenu)
	{


		switch(currentMenu)
		{
		

		case 0: // NEW GAME

			NEW_GAME.enabled = false;


			break;

		// CONTINUE ** NO MENU **
		

		case 2:	// QUICK DROP

			QUICK_DROP.enabled = false;

			break;


		case 3: // QUICK PIRATES

			QUICK_FIGHT.enabled = false;

			break;

		
		case 4: // QUICK ASTEROIDS

			QUICK_ASTEROID.enabled = false;

			break;
		/*
		case 5: // SETTINGS

			SETTINGS.enabled = false;

			break;
		*/
		case 5: // CREDITS

			CREDITS.enabled = false;

			break;
		
		default:

			MAIN_MENU.enabled = false;

			break;

		}

		switch(newMenu)
		{
			
		case 0: // NEW GAME


			//NEW_GAME.enabled = true;
			/*PlayerPrefs.SetString ("StartFrom", "GROUND");
			PlayerPrefs.SetString ("LoadType", "NEW");

			SetInitialStats();




			Application.LoadLevel ("Galaxy");*/

			NEW_GAME.enabled = true;


			break;
			
			// CONTINUE ** NO MENU **
		case 1:
		
			if(PlayerPrefs.HasKey ("NewGame"))
			{
				PlayerPrefs.SetString ("LoadType", "CONTINUE");
				Application.LoadLevel ("Galaxy");
			}
			else
			{
				PlayerPrefs.SetString ("StartFrom", "GROUND");
				SetInitialStats();
				Application.LoadLevel ("Galaxy");
			}
			break;
			
		case 2:	// QUICK DROP

			QUICK_DROP.enabled = true;

			break;
			
			
		case 3: // QUICK PIRATES

			QUICK_FIGHT.enabled = true;

			break;
			
			
		case 4: // QUICK ASTEROIDS

			QUICK_ASTEROID.enabled = true;

			break;
		/*	
		case 6: // SETTINGS

			SETTINGS.enabled = true;

			break;
		*/
		case 5: // CREDITS

			CREDITS.enabled = true;

			break;
			
		default:

			MAIN_MENU.enabled = true;

			menuStyle.alignment = TextAnchor.MiddleRight;

			break;
			
		}







	}


	void Start()
	{	
		/*
		if(Input.GetJoystickNames().Length > 0)
		{
			Gamepad = true;
		}
		else
		{
			Gamepad = false;
		}*/
		Gamepad = false;
	}

}
