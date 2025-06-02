using UnityEngine;
using System.Collections;

public class QuickFightOptions : MonoBehaviour {

	public MenuStyle parentStyle;

	const int menuIndex = 3;

	GUIStyle menuStyle;

	int enemyCount = 10;

	int activeEnemies = 3;

	int HullStrength = 10000;

	void changeCount(int amount, ref int Count)
	{
		Count += amount;

		while(Count%5 != 0)
		{
			Count ++;
		}

		if( Count < 5 )
		{
			Count = 5;
		}
		if(Count > 250)
		{
			Count = 250;
		}

		if(Count < activeEnemies)
		{
			Count = activeEnemies;
		}

	}

	void changeActive(int amount, ref int Active)
	{
		Active += amount;


		if(Active < 1)
		{
			Active = 1;
		}
		if(Active > 15)
		{
			Active = 15;
		}

		if(Active > enemyCount)
		{
			enemyCount = Active;
		}



	}

	void changeStrength(int amount, ref int Strength)
	{

		Strength += amount;

		if(Strength > 20000)
		{
			Strength = 20000;
		}
		if(Strength < 5000)
		{
			Strength = 5000;
		}

	}


	void Launch()
	{
		PlayerPrefs.SetInt ("PirateCount", enemyCount);
		PlayerPrefs.SetInt ("QuickHull", HullStrength);
		PlayerPrefs.SetInt ("QueueLength", activeEnemies);
		PlayerPrefs.SetString ("GameType", "QUICK");

		Application.LoadLevel ("Battle");
		
	}

	void OnGUI()
	{
		GUI.Label (new Rect(100, Screen.height/2-100, 200f, 30), "TOTAL ENEMIES", menuStyle);
		GUI.Label (new Rect(100, Screen.height/2-60, 200f, 30f), "ACTIVE ENEMIES", menuStyle);
		GUI.Label (new Rect(100, Screen.height/2-20, 200, 30), "HULL STRENGTH", menuStyle);


		GUI.Label (new Rect(Screen.width/2, Screen.height/2-100, 100f, 30f), enemyCount.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-60, 100f, 30f), activeEnemies.ToString (), menuStyle);
		GUI.Label (new Rect(Screen.width/2, Screen.height/2-20, 100f, 30f), HullStrength.ToString (), menuStyle);


		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-100, 40, 30), "<", menuStyle))
		{
			changeCount(-5, ref enemyCount);
		}
		if(GUI.Button (new Rect(Screen.width/2-40,  Screen.height/2-60, 40, 30), "<", menuStyle))
		{
			changeActive (-1, ref activeEnemies);
		}
		if(GUI.Button (new Rect(Screen.width/2-40, Screen.height/2-20, 40, 30), "<", menuStyle))
		{
			changeStrength (-500, ref HullStrength);
		}

		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-100, 40, 30), ">", menuStyle))
		{
			changeCount (5, ref enemyCount);
		}
		if(GUI.Button(new Rect(Screen.width/2+180,  Screen.height/2-60, 40, 30), ">", menuStyle))
		{
			changeActive(1, ref activeEnemies);
		}

		if(GUI.Button (new Rect(Screen.width/2+180, Screen.height/2-20, 40, 30), ">", menuStyle))
		{
			changeStrength(500, ref HullStrength);
		}





		if(GUI.Button (new Rect(20, Screen.height-40, 220, 30), "Back", menuStyle))
		{
			parentStyle.SwitchMenu(menuIndex, -1);
		}
		
		if(GUI.Button (new Rect(Screen.width - 240, Screen.height-40, 220, 30), "Launch", menuStyle))
        {
            Launch ();
        }

	}

	// Use this for initialization
	void Start () 
	{
		menuStyle = parentStyle.menuStyle;
		menuStyle.alignment = TextAnchor.MiddleLeft;
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
