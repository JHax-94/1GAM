using UnityEngine;
using System.Collections;

public class motherShip : MonoBehaviour {

	public Rigidbody2D turretMech;
	public Rigidbody2D forceField;

	public shieldControls shieldControl;

	public Transform shield;

	Vector2 shieldPos;

	public int HullIntegrity;

	public float turnSpeed = 32f;
	public float forceFieldSpeed = 16f;

	public SpriteRenderer[] sprites;

	public ParticleEmitter[] Emitters;

	public Collider2D hitBox;

	public Exploderation explodeTrigger;

	float deltaAngle;

	bool mouseShield = false;

	public bool alive = true;

	// Use this for initialization
	void Start () 
	{
		Time.timeScale = 1;
		shieldControl.shieldSwitch(false);
		if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
		{
			HullIntegrity = PlayerPrefs.GetInt("Mother_Hull");
		}
		shieldPos = shield.position;

	}

	IEnumerator DefeatedTimer()
	{
		for(int i = 0; i < 2; i ++)
		{
			if(i > 0)
			{
				if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
				{
					Application.LoadLevel ("GameOver");

				}
				else
				{
					Application.LoadLevel ("Menu");
				}

			}

			yield return new WaitForSeconds(3f);
		}
	}


	// Update is called once per frame
	void Update () 
	{
		if(HullIntegrity <= 0)
		{
			HullIntegrity = 0;
			alive = false;
			hitBox.enabled = false;
			for(int i = 0; i < 2; i ++)
			{
				Emitters[i].emit = false;
				sprites[i].enabled = false;
			}


			//Application.LoadLevel ("Menu");


			explodeTrigger.trigger ();

			StartCoroutine(DefeatedTimer());
		}


		if(alive)
		{

			//shield.position = shieldPos;
			if(Input.GetAxis ("MouseWheel") > 0)
			{
				//shieldControl.shieldSwitch (true);
				/*
				Vector2 mouseInput = new Vector2(Input.mousePosition.x, Input.mousePosition.y);

				if(shield.localPosition != new Vector3(0f, 5.2f, 0f))
				{
					shield.localPosition = new Vector2(0f, 5.2f);
				}

				deltaAngle = Vector2.Angle (shield.position, mouseInput);
				Vector3 dir = Vector3.Cross (shield.position, mouseInput);

				if(dir.z < 0)
				{
					deltaAngle = -deltaAngle;
				}

				forceField.angularVelocity = deltaAngle/0.1f;
				*/
				mouseShield = true;

				shieldControl.shieldSwitch (true);
			}
			if(Input.GetAxis("MouseWheel") < 0)
			{
				mouseShield = false;

				shieldControl.shieldSwitch (false);

			}



			if(mouseShield)
			{
				Vector3 screenPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);

				Vector2 mouseInput = new Vector2(screenPos.x, screenPos.y);



				Debug.Log ("Mouse: (" + Input.mousePosition.x + ", " + Input.mousePosition.y + ")");

				if(shield.localPosition != new Vector3(0f, 5.2f, 0f))
				{
					shield.localPosition = new Vector2(0f, 5.2f);
				}
				
				//deltaAngle = Vector2.Angle (shield.position, mouseInput);
				deltaAngle = Vector2.Angle (Vector2.up, mouseInput);

				//Vector3 dir = Vector3.Cross (shield.position, mouseInput);

				Vector3 dir = Vector3.Cross (Vector2.up, mouseInput);

				if(dir.z < 0)
				{
					deltaAngle = -deltaAngle;
				}
				
				//forceField.angularVelocity = deltaAngle;//0.1f;

				forceField.transform.localRotation = Quaternion.AngleAxis(deltaAngle, Vector3.forward);

			}






			if(Input.GetAxis("Horizontal") != 0 || Input.GetAxis ("Vertical") != 0)
			{
				//forceField.velocity = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis ("Vertical"));
				//shieldMotor.useMotor = true;

				mouseShield = false;

				Vector2 stickInput = new Vector2( Input.GetAxis ("Horizontal"), Input.GetAxis ("Vertical"));

				if(shield.localPosition != new Vector3(0f, 5.2f, 0f))
				{
					shield.localPosition = new Vector2(0f, 5.2f);
	            }
	            



				//Angle between current position && cursor position

				//deltaAngle = Vector2.Angle(shield.position, stickInput);

				deltaAngle = Vector2.Angle (Vector2.up, stickInput);


				Debug.Log ("Angle = " + deltaAngle);
				Vector3 dir = Vector3.Cross(Vector2.up, stickInput);
				//Debug.Log ("Delta Angle: " + deltaAngle);

				if(dir.z < 0)
				{
					deltaAngle = -deltaAngle;
				}



				//forceField.angularVelocity = deltaAngle;//0.1f;

				forceField.transform.localRotation = Quaternion.AngleAxis(deltaAngle, Vector3.forward);
				//forceField.angularVelocity = 1000f;

				shieldControl.shieldSwitch(true);


			}
			else if(shieldControl.ShieldsOn() && mouseShield != true)
			{
				//shieldMotor.useMotor = false;
				//forceField.velocity = Vector2.zero;
				//shieldLimb.SetActive(false);




				shieldControl.shieldSwitch(false);

				/*
				if(shield.localPosition  != Vector3.zero)
				{
					shield.localPosition = Vector2.zero;
	            }
	            
	            forceField.angularVelocity = 0f;
				*/
			}


			if(Input.GetAxis ("Right_X") > 0 || Input.GetKey (KeyCode.D) || Input.GetKey (KeyCode.E) || Input.GetKey (KeyCode.RightArrow))
			{
				//Debug.Log ("Right X > 0");
				turretMech.angularVelocity = -turnSpeed;


			}
			else if(Input.GetAxis ("Right_X") < 0 || Input.GetKey (KeyCode.A) || Input.GetKey(KeyCode.Q) || Input.GetKey (KeyCode.LeftArrow))
			{
				//Debug.Log ("Right X < 0");

				turretMech.angularVelocity = turnSpeed;
			}
			else
			{
				turretMech.angularVelocity = 0f;
			}
		}
	}
}
