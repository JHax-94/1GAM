using UnityEngine;
using System.Collections;

public class HUG : MonoBehaviour 
{
	public int Points = 0;

	public Controls McFish;

	public Texture2D emptyMolluscBar;
	public Texture2D molluscBar;

	public float f_Mollusc = 1.0f;

	public float f_Momentum = 0.01f;

	public GUIStyle sturgeonStyle;

	string levelString = "MainMenu";

	int ScoreToBeat = 0;

	bool gameOn = false;

	Rect DispRect;
	float deathRate = 1f;

	string saveKey;

	IEnumerator Accumulate()
	{
		while(gameOn)
		{
			yield return new WaitForSeconds(0.5f);

			Points ++;
		}
	}

	IEnumerator Deprecate()
	{
		while(gameOn)
		{
			if(Mathf.Abs (McFish.transform.position.y) > 5.25)
			{
				deathRate = 10f;
			}
			else 
			{
				deathRate = 1f;
			}


			f_Mollusc -= 0.001f*(2f-1.9f*McFish.momentum)*deathRate;

			yield return new WaitForSeconds(0.1f);

			if(f_Mollusc <= 0)
			{


				if(Points > ScoreToBeat)
				{
					Debug.Log ("New High Score!");
					PlayerPrefs.SetInt (saveKey, Points);
					Debug.Log (PlayerPrefs.GetInt(saveKey));
					levelString = "NewHighScore";
				}


				gameOn = false;
			}
		}
		Debug.Log ("f_Mollusc = " + f_Mollusc);
		Application.LoadLevel (levelString);

	}


	void OnGUI()
	{
		if(f_Mollusc > 1) f_Mollusc = 1;

		GUI.Box(DispRect, "");
		GUI.Label (new Rect(DispRect.x+5, DispRect.y, DispRect.width-10, DispRect.height), "Points: " + Points, sturgeonStyle);

		GUI.BeginGroup (new Rect(Screen.width-30, 0, 30, Screen.height));

		GUI.DrawTexture(new Rect(0, 0, 30, Screen.height), emptyMolluscBar);
		GUI.DrawTexture (new Rect(10, Screen.height-Screen.height*f_Mollusc, 20, Screen.height*f_Mollusc), molluscBar);
		                        
		GUI.EndGroup ();

		GUI.BeginGroup(new Rect(Screen.width/2-330, 0, 660, 40));
		
		GUI.DrawTexture (new Rect(0, 0, 660, 40), emptyMolluscBar);
		GUI.DrawTexture (new Rect(10, 0, 640*McFish.momentum, 30), molluscBar);

		GUI.EndGroup();


	}



	// Use this for initialization
	void Start () 
	{
	

		if(PlayerPrefs.GetInt ("ControlStyle") == 0)
		{
			saveKey = "TopScoreFilthy";
			//ScoreToBeat = PlayerPrefs.GetInt ("TopScoreFilthy");
		}
		else
		{
			saveKey = "TopScoreHard";
			//ScoreToBeat = PlayerPrefs.GetInt ("TopScoreHard");
		}
		Debug.Log("Save Key:" + saveKey);	
		ScoreToBeat = PlayerPrefs.GetInt (saveKey);
		Debug.Log ("Score To Beat: " + ScoreToBeat);
		
		gameOn = true;
		DispRect = new Rect(5, 5, 140, 30);
		StartCoroutine(Accumulate());
		StartCoroutine(Deprecate ());
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}*/
}
