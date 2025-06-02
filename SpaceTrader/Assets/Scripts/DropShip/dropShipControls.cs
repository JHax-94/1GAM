using UnityEngine;
using System.Collections;

public class dropShipControls : MonoBehaviour {

	bool quickGame = false;
	string targetPad = "";

	CampaignGUI campaignMenu;


	public GameObject Claw;

	public float Thrust = 1f;
	public float TurnPower = 1f;

	public float BaseHeight;

	public ParticleEmitter[] smokeTrails;

	public SpriteRenderer spriteControl;

	public GUIStyle Metrics;

	//public Animator[] animationControl;
	
	public float height;

	public float tick = 0;
	public float forceTick = 0;

	public int HullStrength;

	public int Fuel;

	LayerMask landerMask = 1 << 0;
	bool firstPress = false;
	bool checkLanding = false;

	bool campaign = false;




	void OnGUI()
	{
		GUI.Label (new Rect(Screen.width-275, 20, 200, 30), "Hull Integrity: " + HullStrength, Metrics);
		GUI.Label (new Rect(Screen.width-275, 40, 200, 30), "Fuel: " + Fuel, Metrics);
		if(!campaign)
		{
			if(targetPad != "ShipPad")
			{
				GUI.Label(new Rect(Screen.width-275, 60, 200, 30), "LAND ON PLANET", Metrics);

			}
			else
			{
				GUI.Label(new Rect(Screen.width-275, 60, 200, 30), "RETURN TO SHIP", Metrics);
			}

		}



	}

	public void Off()
	{
		spriteControl.enabled = false;
		smokeTrails[0].emit = false;
		smokeTrails[1].emit = false;
		GetComponent<Rigidbody2D>().fixedAngle= true;

	}

	/*void OnGUI()
	{
	//	GUI.Label (new Rect(10, 10, 120, 20), "ALTITUDE: " + height);
	}
	//bool thrustersSet = false;
*/
	// Use this for initialization
	void Start () 
	{
		Time.timeScale = 0;
		checkLanding = false;

		if(PlayerPrefs.GetString ("GameType") == "QUICK")
		{
			quickGame = true;
			campaign = false;
			targetPad = "landtest";
		}
		else
		{
			campaign = true;
			campaignMenu = GameObject.FindGameObjectWithTag("Galaxy").GetComponent<CampaignGUI>();

			if(PlayerPrefs.GetString ("StartFrom") == "GROUND")
			{
				targetPad = "ShipPad";
				Time.timeScale = 1;
			}
			else
			{
				targetPad = "landtest";
			}
		}


	}
	
	// Update is called once per frame
	void Update () 
	{
		if(Input.GetKey(KeyCode.Return) || Input.GetKey(KeyCode.JoystickButton0)) 
		{
			Time.timeScale = 1;
			checkLanding = true;
		}

		if((Input.GetKey(KeyCode.Space) || Input.GetAxis ("Triggers") < 0) && Fuel > 0) 
		{
			
			//animationControl[0].SetBool("Thrusters", true);
			//animationControl[1].SetBool ("Thrusters", true);
			if(Time.timeScale > 0)
			{
				if(!firstPress)
				{
					firstPress = true;
				}

				smokeTrails[0].emit = true;
				smokeTrails[1].emit = true;

				tick += Time.deltaTime;
				forceTick += Time.deltaTime;
				if(tick > 0.05)
				{
					tick = 0;
					Fuel --;

				}
				/*
				if(forceTick > 0.016)
				{
					rigidbody2D.AddForce(transform.up*Thrust);
					forceTick = 0;
				}*/
				GetComponent<Rigidbody2D>().AddForce (transform.up*Thrust*60*Time.deltaTime);


				//Debug.Log ("Adding Thrust!");
				//rigidbody2D.AddForce(transform.up*Thrust);
			}

			if(Fuel < 0)
			{
				Fuel = 0;
			}
		}
		else
		{
		//	animationControl[0].SetBool("Thrusters", false);
		//	animationControl[1].SetBool ("Thrusters", false);

			if(firstPress)
			{
				checkLanding = true;
			}

			tick = 0;
			forceTick = 0;

			smokeTrails[0].emit = false;
			smokeTrails[1].emit = false;

		}
		/*
		if(Input.GetAxis ("Triggers") != 0)
		{
			Debug.Log ("Trigger pressed!");
			Debug.Log ("Trigger value = " + Input.GetAxis ("Triggers"));
		}
	*/
		if(Input.GetKey (KeyCode.A) || Input.GetKey (KeyCode.LeftArrow) || Input.GetAxis("Horizontal") < 0 )
		{
			GetComponent<Rigidbody2D>().angularVelocity = TurnPower;
		}
		else if(Input.GetKey (KeyCode.D) || Input.GetKey (KeyCode.RightArrow) || Input.GetAxis ("Horizontal") > 0)
		{
			GetComponent<Rigidbody2D>().angularVelocity = -TurnPower;
		}
		else
		{
			GetComponent<Rigidbody2D>().angularVelocity = 0;
		}

		if(GetComponent<Rigidbody2D>().velocity.magnitude == 0 && Time.timeScale > 0)
		{
			Debug.Log ("At Rest");

			RaycastHit2D Left = Physics2D.Raycast(new Vector2(transform.position.x-0.3f, transform.position.y), -transform.up, 0.8f, landerMask);
			RaycastHit2D Right = Physics2D.Raycast(new Vector2(transform.position.x+0.3f, transform.position.y), -transform.up, 0.8f, landerMask);

			if(Left) Debug.Log("Left: " + Left.collider.name);

			if(Right) Debug.Log ("Right: " + Right.collider.name);

			

			Debug.DrawLine(new Vector3(transform.position.x-0.3f, transform.position.y, 0f), new Vector3(transform.position.x-0.3f, transform.position.y-0.8f, 0f), Color.green);
			Debug.DrawLine(new Vector3(transform.position.x+0.3f, transform.position.y, 0f), new Vector3(transform.position.x+0.3f, transform.position.y-0.8f, 0f), Color.green);
			if(Left && Right)
			{
				if(Left.collider.tag == "LandingPad" && Right.collider.tag == "LandingPad")
				{
					Debug.Log ("Safe landing!");
					if(!quickGame/* && Left.collider.name == targetPad*/ && checkLanding)
					{
						PlayerPrefs.SetFloat ("Land_X", transform.position.x);
						PlayerPrefs.SetFloat ("Land_Y", transform.position.y);

						//PlayerPrefs.SetInt ("1_Fuel", Fuel);
						//PlayerPrefs.SetInt("1_Hull", HullStrength);

						campaignMenu.setStats (Fuel, HullStrength);

						if(Left.collider.name == "ShipPad")
						{
							campaignMenu.SetOrbit(true);
						}
						else
						{
							campaignMenu.SetOrbit (false);
						}


						campaignMenu.displayOn = true;

						Destroy(transform.parent.parent.gameObject);

						//Application.LoadLevel("Galaxy");
					}
					else
					{

						if(Left.collider.name == targetPad)
						{
							if(targetPad == "landtest")
							{

								Destroy (Claw);
								targetPad = "ShipPad";
							}
							else 
							{
								Application.LoadLevel ("Menu");
							}


						}
					}
					



				}
			}

		}

		height = transform.position.y - BaseHeight;

	}
}
