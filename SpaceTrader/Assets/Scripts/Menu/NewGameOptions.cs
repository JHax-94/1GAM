using UnityEngine;
using System.Collections;

public class NewGameOptions : MonoBehaviour {

	public MenuStyle parentStyle;
	const int MenuIndex = 0;
	GUIStyle newGameStyle;

	int pageNum = 0;

	bool Loading = false;

	void OnGUI()
	{


		if(Loading == true)
		{
			GUI.Label (new Rect(Screen.width/2-90, Screen.height-60, 180, 30), "Loading...", newGameStyle);


		}

		switch(pageNum)
		{

		case -1:

			GUI.Label (new Rect(Screen.width/2-300, Screen.height/2-200, 600, 50), "IF YOU START A NEW GAME YOU WILL LOSE EXISTING PROGRESS\n\nDO YOU STILL WISH TO START A NEW GAME?", newGameStyle);

			if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2, 100, 30), "YES", newGameStyle))
			{
				//Loading = true;
				
				//parentStyle.SwitchMenu(MenuIndex, -1);
				pageNum = 0;
				
			}


			if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2+50, 100, 30), "NO", newGameStyle))
			{

				parentStyle.SwitchMenu(MenuIndex, -1);



			}

			break;


		case 0:

			GUI.Label (new Rect(Screen.width/2-200, Screen.height/2-200, 400, 50), "SKIP TUTORIAL?", newGameStyle);
			if(!Loading)
			{
				if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2, 100, 30), "YES", newGameStyle))
				{
					Loading = true;

					parentStyle.SetInitialStats();


				}
				if(GUI.Button (new Rect(Screen.width/2-50, Screen.height/2+50, 100, 30), "NO", newGameStyle))
				{
					pageNum = 1;
					newGameStyle.alignment = TextAnchor.MiddleLeft;
				}

			}



			break;

		case 1:

			GUI.Label (new Rect(100, 100, Screen.width-200, Screen.height-200), "CAMPAIGN:\n\nYour goal is to traverse the galaxy trading your wares in order to gain a monopoly over the galaxy's supply of Maguffium, a newly discovered mineral with mysterious properties.\n\nTo do this, you must have 1000 Maguffium in your Mother Ship's Hold.\n\nPlanets may occassionally embargo a commodity. If you land with embargoed goods in your Drop Ship they could be confiscated, but if they get past customs they should fetch quite a price on the Black Market!\n\nTo trade on a planet you must first land your Drop Ship on its surface...\n\nEsc/Start - Brings up Save/Quit Menu", newGameStyle);
			if(!Loading)
			{
				if(GUI.Button (new Rect(50, Screen.height-60, 100, 30), "SKIP", newGameStyle))
				{

					Loading = true;

					parentStyle.SetInitialStats();

				}

				if(GUI.Button (new Rect(Screen.width-150, Screen.height-60, 100, 30), "NEXT", newGameStyle))
				{
					
					pageNum = 2;
					
				}

			}

			  

			




			break;

		case 2:


			GUI.Label (new Rect(100, 100, Screen.width-200, Screen.height-200), "PLANET DROPS:\n\nTo trade on a planet, the Drop Ship must delicately be landed on its surface. Landing on the pad on the ground will bring up the planetary menu and landing at the Mother Ship's pad will return you to the ship.\n\nMarkers between your ship and the ground should help to judge the distance, with square markers every 10 space metres, octagonal markers near the ship and triangular markers near the ground.\n\nThe height of the drop increases each time you return to the Mother Ship after successfully landing on the planet and slowly decreases again over time.\n\nYour first replacement Drop Ship is on the house, but insurance premiums go up quickly if you keep destroying expensive equipment!\n\nEnter/A Button - Release Drop Ship\n\nSpace/Right Trigger - Thrusters\n\nLeft Stick/Arrow Keys/Q & E/A & D - Steer", newGameStyle);
			if(!Loading)
			{
				if(GUI.Button (new Rect(50, Screen.height-60, 100, 30), "SKIP", newGameStyle))
				{
					parentStyle.SetInitialStats();
					
				}
				if(GUI.Button (new Rect(Screen.width-150, Screen.height-60, 100, 30), "NEXT", newGameStyle))
				{
					
					pageNum = 3;
					
				}

			}

			break;

		case 3:

			GUI.Label (new Rect(100, 100, Screen.width-200, Screen.height-200), "PIRATE ATTACKS:\n\nThe galaxy is a perilous place! Trade routes are often plundered by nefarious pirates! Each traversal of a trade route increases the risk of being attacked by pirates on that route, although this decreases over time. Fortunately your Mother Ship packs a little heat! When attacked by pirates it is often advisable to try shooting back at them.\n\nArrow Keys/Q & E/A & D/Right Stick - Aim\n\nMouse Wheel Up/Moving Left Stick - Shields On\n\nMouse Wheel Down/Left Stick Idle - Shields Off\n\nMouse/Left Stick - Shield Position", newGameStyle);
			if(!Loading)
			{
				if(GUI.Button (new Rect(50, Screen.height-60, 100, 30), "SKIP", newGameStyle))
				{

					Loading = true;

					parentStyle.SetInitialStats();
					
				}

				if(GUI.Button (new Rect(Screen.width-150, Screen.height-60, 100, 30), "NEXT", newGameStyle))
				{
					
					pageNum = 4;
					
				}

			}



			break;


		case 4:

			GUI.Label (new Rect(100, 100, Screen.width-200, Screen.height-200), "ASTEROID FIELDS:\n\nDespite the efforts of genius space cartographers, many of the galaxies main thoroughfairs are littered with asteroids. Ships will often have to drop out of hyperspace in order to carefully navigate an asteroid field. Of course, most freighters don't have the maneuverability to dodge around oncoming space rocks, so the next best thing is to bat them out of the way with energy shields and guns!\n\nArrow Keys/Q & E/A & D/Right Stick - Aim\n\nMouse Wheel Up/Moving Left Stick - Shields On\n\nMouse Wheel Down/Left Stick Idle - Shields Off\n\nMouse/Left Stick - Shield Position", newGameStyle);

			if(!Loading)
			{
				if(GUI.Button (new Rect(50, Screen.height-60, 100, 30), "SKIP", newGameStyle))
				{
					
					Loading = true;
					
					parentStyle.SetInitialStats();
					
				}
				
				if(GUI.Button (new Rect(Screen.width-150, Screen.height-60, 100, 30), "NEXT", newGameStyle))
				{
					
					pageNum = 5;
					
				}
				
			}


			break;

		case 5:

			GUI.Label (new Rect(100, 100, Screen.width-200, Screen.height-200), "UPGRADES:\n\nSome planets offer upgrades for your equipment on the Engineering tab.\n\nFuel Efficiency: Jumps between planets cost less Heavy Fuel.\n\nFuel Tank: Allows the drop ship to carry more fuel.\n\nHold: Allows the Drop Ship to transport more goods in each drop.\n\nHull Strength: Allows the Drop Ship to take more of a beating.\n\nNOTE: Drop Ship upgrades are lost if the Drop Ship explodes, and are non refundable.", newGameStyle);
			
			/*if(GUI.Button (new Rect(50, Screen.height-60, 100, 30), "SKIP", newGameStyle))
			{
				parentStyle.SetInitialStats();
				
			}*/
			if(!Loading)
			{
				if(GUI.Button (new Rect(Screen.width-150, Screen.height-60, 100, 30), "BEGIN", newGameStyle))
				{
					Loading = true;
					//pageNum = 3;

					parentStyle.SetInitialStats();
					
				}
			}
			break;

		}

	}



	// Use this for initialization
	void Start () 
	{
		if(PlayerPrefs.GetInt ("InProgress") == 1)
		{
			pageNum = -1;
		}

		newGameStyle = parentStyle.menuStyle;
		newGameStyle.alignment = TextAnchor.MiddleCenter;
	}
	
	// Update is called once per frame
	void Update () 
	{
	
	}
}
