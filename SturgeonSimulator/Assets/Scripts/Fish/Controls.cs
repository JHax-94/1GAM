using UnityEngine;
using System.Collections;

public class Controls : MonoBehaviour {

	public HUG DISPLAY;

	public Transform Fishform;

	public Rigidbody2D FishyBody;
	public MouseTracking mouseTrack;

	public PolygonCollider2D COLLIDER;

	public Flippers flipperControl;

	Vector3 _position;
	Vector3 _velocity;

	float perm_x;

	public float momentum = 0.01f;
	bool timerOn = false;

	bool[] WaitForUp = {false, false};

	int prevDir = 0;

	int controlScheme = 0;

	float deltaAngle = 0;


	IEnumerator Death()
	{
		yield return new WaitForFixedUpdate();
		transform.localScale = new Vector3( transform.localScale.x, -transform.localScale.y, transform.localScale.z);
		COLLIDER.enabled = false;
		FishyBody.gravityScale = -100;
	}

	IEnumerator IdleTimer()
	{
		yield return new WaitForSeconds(1.1f-momentum);
		//flipperControl.Centre();
		//Debug.Log ("Momentum lost!");
		momentum = 0.01f;
	}

	IEnumerator FixPosition()
	{
		yield return new WaitForSeconds(0.075f);
		Fishform.position = new Vector3(perm_x, Fishform.position.y, 0);
		FishyBody.velocity = new Vector3(0, FishyBody.velocity.y, 0);
		DISPLAY.f_Mollusc += 0.1f;
		if(DISPLAY.f_Mollusc > 1f)
		{
			DISPLAY.f_Mollusc = 1f;
		}

	}

	void OnTriggerEnter2D(Collider2D Hit)
	{
		//Debug.Log ("HIT!");

		if(Hit.tag == "Snail")
		{
		//	Debug.Log ("SNAIL HIT!");
			//StartCoroutine(FixPosition());
			DISPLAY.f_Mollusc += 0.1f;

		}
	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		controlScheme = -1;
		StartCoroutine(Death ());

	}

	IEnumerator MaintainMomentum(int dir, float mom)
	{
		yield return  new WaitForSeconds(0.2f);

		if(dir == prevDir && mom == momentum)
		{
			momentum = 0.01f;

		}


	}


	// Use this for initialization
	void Start () 
	{

		controlScheme = PlayerPrefs.GetInt ("ControlStyle");
		//Debug.Log ("Control Scheme: " + controlScheme);
		perm_x = transform.position.x;
		//_transform = transform;
		//_rigidbody = rigidbody2D;
	}

	// Update is called once per frame
	void Update () 
	{



		Vector3 mousePos = mouseTrack.trackingPosition();


		//deltaAngle = Vector3.Angle (Fishform.position, mousePos);

		Vector3 dir = mousePos - Fishform.position;

		deltaAngle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

		//Debug.Log ("Mouse Height = " + mousePos.y + "\nFish Height = " + Fishform.position.y);

		Fishform.rotation = Quaternion.AngleAxis(deltaAngle, Vector3.forward);
		dir = new Vector3(0, dir.y, 0);

		if((Input.GetMouseButton (0) && controlScheme == 0) || (Input.GetKey(KeyCode.LeftShift) && controlScheme == 1))
		{
			flipperControl.Left ();

			//Debug.Log ("LEFT (DIR 1)");
			//Debug.Log ("prevDir = " + prevDir);
			if(!WaitForUp[0])
			{
				StopCoroutine("IdleTimer");
				timerOn = false;
				// LEFT

				if(prevDir != 1)
				{
					momentum += 0.01f;
					if(momentum > 1)
					{
						momentum = 1;
					}

				}
				else 
				{
					//Debug.Log("Double clicked! LEFT");

					momentum = 0.01f;

				}


				//Debug.Log ("Left");
				if(prevDir != 1)
				{
					FishyBody.AddForce ((dir/dir.magnitude)*momentum*50);
					prevDir = 1;
				}

				WaitForUp[0] = true;
			}


		}
		else if((Input.GetMouseButton(1) && controlScheme == 0) || (Input.GetKey (KeyCode.RightShift) && controlScheme == 1)) 
		{//Debug.Log ("Right");

			flipperControl.Right ();

			//Debug.Log ("RIGHT (DIR -1)");

			//Debug.Log ("prevDir = " + prevDir);

			if(!WaitForUp[1])
			{
				StopCoroutine("IdleTimer");
				timerOn = false;



				if(prevDir != -1)
				{
					momentum += 0.01f;

					if(momentum > 1)
					{
						momentum = 1;
					}

				}
				else 
				{
					//Debug.Log ("Double clicked! RIGHT");

					momentum = 0.01f;
				}

				// RIGHT
				if(prevDir != -1)
				{
					FishyBody.AddForce ((dir/dir.magnitude)*momentum*50);
					prevDir = -1;
				}

				WaitForUp[1] = true;
			}



		}
		else
		{
			if(momentum!= 0 && timerOn == false)
			{
				timerOn = true;
				StartCoroutine("IdleTimer");
			}
			// CENTRE
			//prevDir = 0;
		//	flipperControl.Centre ();


		}

		if(WaitForUp[0] == true && ((Input.GetMouseButtonUp(0) && controlScheme == 0) || (Input.GetKeyUp (KeyCode.LeftShift) && controlScheme == 1)))
		{
			WaitForUp[0] = false;
		}
		else if(WaitForUp[1] == true && ((Input.GetMouseButtonUp(1) && controlScheme == 0) || (Input.GetKeyUp (KeyCode.RightShift) && controlScheme == 1)))
		{
			WaitForUp[1] = false;
		}




	}
}
