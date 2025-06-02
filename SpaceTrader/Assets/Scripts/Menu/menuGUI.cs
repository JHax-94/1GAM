using UnityEngine;
using System.Collections;

public class menuGUI : MonoBehaviour {

	public MenuStyle parentStyle;


	public GUIStyle TitleStyle;

	GUIStyle MenuGUI;

	int prevIndex = 0;
	//bool wait = false;

	string[] Options = {"New Campaign", "Continue Campaign", "Quick Drop", "Quick Pirate Attack", "Quick Asteroid Run", "Credits"};
	int gridIndex = 0;

	//bool Rest = true;

	void OnGUI()
	{

		GUI.Label (new Rect(Screen.width/2-100, 50, 200, 80), "TRAVERSE", TitleStyle);

		GUI.Label (new Rect(15, Screen.height-45, 300, 30), ( (char) 169) + " Josh Haxell 2014", MenuGUI);
		GUI.SetNextControlName("Grid");
		gridIndex = GUI.SelectionGrid(new Rect(Screen.width/2, Screen.height/2, Screen.width/2-20, Screen.height/2-40), gridIndex, Options, 1, MenuGUI);
		GUI.FocusControl("Grid");
		//Debug.Log ("Grid Index = " + gridIndex);
		/*
		if(Input.GetMouseButton (0))
		{
			Vector3 mouseCoords = Input.mousePosition;

			if(mouseCoords.x > Screen.width/2 && mouseCoords.y < Screen.height/2 )
			{
				if(prevIndex == gridIndex)
				{
					Debug.Log ("Open a sub menu!");
				}
			}
		}*/
		/*Debug.Log ("Event type: " + Event.current.type);

		if(Event.current.type == EventType.Layout)
		{
			if(Input.GetMouseButton(0))
			{
				if(prevIndex == gridIndex)
				{
					Debug.Log ("Open sub menu!");
				}
			}
		}*/

		if(GUI.changed)
		{
			if(prevIndex == gridIndex)
			{
				//Debug.Log ("Previous!");
				parentStyle.SwitchMenu(-1, gridIndex);
			}
			else
			{
				//Debug.Log ("Different!");
				//parentStyle.SwitchMenu (-1, gridIndex);
				prevIndex = gridIndex;
				parentStyle.SwitchMenu (-1, gridIndex);
			}



		}


		 

	}

	// Use this for initialization
	void Start () 
	{
		MenuGUI = parentStyle.menuStyle;
		MenuGUI.alignment = TextAnchor.MiddleRight;
		

	}

	void shiftGridIndex(int shiftBy)
	{
		if(gridIndex+shiftBy == Options.Length)
		{
			gridIndex = 0;
		}
		else if(gridIndex+shiftBy < 0)
		{
			gridIndex = Options.Length-1;
		}
		else
		{
			gridIndex += shiftBy;
		}
	}

	// Update is called once per frame
	void Update () 
	{
	/*	if(Input.GetMouseButtonUp(0))
		{
			wait = false;
		}
*/		
		if(Input.GetKey (KeyCode.JoystickButton0))
		{
			parentStyle.SwitchMenu(-1, gridIndex);
		}
		/*
		if(Input.GetAxis ("Vertical") > 0.3 && Rest == true)
		{
			shiftGridIndex(-1);
			Rest = false;
		}
		else if(Input.GetAxis("Vertical") < -0.3 && Rest == true)
		{
			shiftGridIndex(1);
			Rest = false;
		}
		else
		{
			Rest = true;
		}*/
	}
}
