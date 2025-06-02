using UnityEngine;
using System.Collections;

public class pirateShip : MonoBehaviour {

	public pirateGuns weaponSystems;

	//public ArmatureFunctions Armature;
//	public HingeJoint2D CentreHinge;

	public SpriteRenderer sprite;
	public Collider2D hitBox;

	public Transform[] backlights;

	public DirectorAI Director;

	public int shotsFired;

	public bufferOverride bufferZone;

	public ParticleEmitter Explosion;

	public const float linearSpeed = 2f;
	public const float angularSpeed = 20f;
	
	const float conversion = Mathf.Deg2Rad;

	const float minDist = 2.5f;
	const float maxDist = 4.5f;

	LayerMask targetingMask = 1 << 8;

	float timeRemaining;
	float deltaAngle;
	//float angleTurned = 0;

	//float clocker = 0f;
	//float startTime;
	bool moving = false;

	bool adjusting = false;

	bool RandomPositioning = true;

	bool weaponsOnline = false;

	bool alive = true;

	IEnumerator DestroyShip()
	{


		Director.shipDestroyed();

		yield return new WaitForSeconds(0.1f);

		Director.ActiveSpawn();

		yield return new WaitForSeconds(0.3f);

		hitBox.enabled = false;
		sprite.enabled = false;
		GetComponent<Rigidbody2D>().angularVelocity = 0;

		Explosion.Emit ();

		yield return new WaitForSeconds(1f);

		Destroy(gameObject);

	}

	bool checkBehind()
	{
		bool HitSomething = false;

		RaycastHit2D Left = Physics2D.Raycast(backlights[0].position, backlights[0].up, 1f);
		RaycastHit2D Right = Physics2D.Raycast(backlights[1].position,  backlights[1].up, 1f);
		//Debug.DrawLine(transform.position, transform.position*((transform.position.magnitude+1f)/transform.position.magnitude), Color.blue, 3f);
		if(Left != false || Right != false)
		{
			HitSomething = true;
		}


		return HitSomething;
	}

	bool checkFront()
	{
		bool hitSomething = false;

		RaycastHit2D Left = Physics2D.Raycast(weaponSystems.LeftGun.position, -transform.up, 1);
		RaycastHit2D Right = Physics2D.Raycast(weaponSystems.RightGun.position, -transform.up, 1);

		if(Left != false || Right != false)
		{

			hitSomething = true;
		}

		return hitSomething;


	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		//Debug.Log ("Collision with " + Hit.transform.tag);
		if(alive)
		{
			if(Hit.transform.tag == "Bullet" || Hit.transform.tag == "Pirate" || Hit.transform.tag == "Shield")
			{
				bufferZone.hitBox.enabled = false;
				alive = false;
			/*	Director.shipDestroyed();
				Director.ActiveSpawn();
				Destroy (gameObject);*/
				//bufferZone.hitBox.enabled = false;
				//bufferZone.enabled = false;

				//Destroy(bufferZone.gameObject);
				//bufferZone.hitBox.enabled = false;
				weaponSystems.enabled = false;

				StartCoroutine(DestroyShip());

			}
		}
	}


	public void EndTravel(bool clampAngle)
	{

		if(alive)
		{
			GetComponent<Rigidbody2D>().velocity = Vector3.zero;

			if(deltaAngle != 0) adjusting = true;
			else
			{
				GetComponent<Rigidbody2D>().angularVelocity = 0f;
				weaponsOnline = true;
				weaponSystems.enabled = true;
				adjusting = false;
			}


			moving = false;
			//rigidbody2D.angularVelocity = 0f;

			if(clampAngle)
			{
				GetComponent<Rigidbody2D>().angularVelocity = 0f;
				weaponsOnline = true;
				weaponSystems.enabled = true;
				adjusting = false;
			}

			deltaAngle = 0;
			bufferZone.hitBox.enabled = false;

		}
		//weaponsOnline = true;
		//weaponSystems.enabled = true;

	}

	void EndTravel()
	{
		EndTravel (false);
	}



	void TravelTo(Vector3 target, bool angle)
	{
		if(alive)
		{
			bufferZone.hitBox.enabled = true;

			weaponSystems.enabled = false;

			//Debug.Log ("Turn function!");


			Vector3 newVelocity = target-transform.position;

			newVelocity = (newVelocity/newVelocity.magnitude)*linearSpeed;

			if(angle)
			{
				deltaAngle = Vector2.Angle(transform.up, target);
				Vector3 dir = Vector3.Cross(transform.position, target);
				//Debug.Log ("Delta Angle: " + deltaAngle);
				if(dir.z < 0)
				{
					deltaAngle = -deltaAngle;
				//	rigidbody2D.velocity = new Vector2(-1, 0);
					
				}
		/*	else
			{
				rigidbody2D.velocity = new Vector2(1, 0);
			}*/
			}
			GetComponent<Rigidbody2D>().velocity = newVelocity;

			float projectedTime = (target-transform.position).magnitude/newVelocity.magnitude;

			if(deltaAngle != 0 && angle == true)
			{
			//	Debug.Log ("Velocity = " + newVelocity.magnitude);
			//	Debug.Log ("Distance = " + (target-transform.position).magnitude);


				//float projectedTime = (target-transform.position).magnitude/newVelocity.magnitude;

			//	Debug.Log ("Angle = " + deltaAngle);
			//	Debug.Log ("Projected time = " + projectedTime);

				GetComponent<Rigidbody2D>().angularVelocity = (deltaAngle/projectedTime);


			}
			timeRemaining = projectedTime;



			moving = true;
		}
		//rigidbody2D.angularVelocity = angularSpeed;


		//rigidbody2D.velocity = new Vector2(Mathf.Lerp(0, 1, Time.deltaTime), Mathf.Lerp (0, -1), Time.deltaTime);


	}

	public	void TravelTo(Vector3 Destination)
	{
		TravelTo(Destination, true);
	}

	void RandomMove()
	{
		if(alive)
		{
			float radius = transform.position.magnitude;

			if(bufferZone.vicinity)
			{
				bufferZone.CheckBuffer();
			}

			if(bufferZone.vicinity)
			{

				bool ignore = false;

				if(Mathf.Abs (transform.position.x) >= 8 || Mathf.Abs(transform.position.y) >= 6 )
				{
					float shiftAngle = Random.value*30+90;
					


					
					float currentAngle = transform.eulerAngles.z + 90;
					
					//Debug.Log ("Shift angle = " + shiftAngle);
					
					//Debug.Log ("Current angle = " + currentAngle);
					
					
					float newAngle = currentAngle + shiftAngle;
					
					if(newAngle > 360)
					{
						newAngle -= 360;
					}
					//Debug.Log ("Target angle = " + newAngle);
	                
	                Vector3 targetPosition = new Vector3(Mathf.Cos (conversion*newAngle), Mathf.Sin (conversion*newAngle), 0)*radius;
	                
	            
					RandomPositioning = false;

					transform.position = targetPosition;
					transform.up = transform.position;

					TravelTo(transform.position*(3.5f/transform.position.magnitude));

					ignore = true;

				}

				if(radius > maxDist && ignore == false)
				{
					if(!checkFront())
					{
						Debug.DrawLine(transform.position, transform.position*(3/transform.position.magnitude), Color.yellow, 1f);

						TravelTo(transform.position*(3/transform.position.magnitude), false);
						ignore = true;
					}
				}

				if(!ignore)
				{
					if(!checkBehind())
					{
						// MOVE BACK
					//	bufferZone.referenceTransform.GetComponentInChildren<bufferOverride>().vicinity = false;

						Debug.DrawLine(transform.position, transform.position*((transform.position.magnitude+1f)/transform.position.magnitude), Color.blue, 3f);
						
						TravelTo(transform.position*((transform.position.magnitude+1f)/transform.position.magnitude), false);
						RandomPositioning = true;
					}
					else//(bufferZone.vicRadius <= transform.position.magnitude + 0.6f)
					{
						TravelTo (transform.position+transform.right*bufferZone.direction*2);
						RandomPositioning = false;
					}
				}
				/*else
				{
					weaponsOnline = true;
					weaponSystems.enabled = true;
				}*/
			}
			else if((radius < minDist || radius > maxDist) && RandomPositioning == false)
			{
				Debug.DrawLine(transform.position, transform.position*(3/transform.position.magnitude), Color.red, 3f);

				TravelTo(transform.position*(3/transform.position.magnitude), false);
			}
			else
			{
				float shiftAngle = Random.value*30+90;

				float direction = Random.value;
				if(Mathf.Round(direction) == 0)
				{
					shiftAngle *= -1;
				}
				else
				{
					shiftAngle *= 1;
				}

				float currentAngle = transform.eulerAngles.z + 90;

				//Debug.Log ("Shift angle = " + shiftAngle);

				//Debug.Log ("Current angle = " + currentAngle);


				float newAngle = currentAngle + shiftAngle;

				if(newAngle > 360)
				{
					newAngle -= 360;
				}
				//Debug.Log ("Target angle = " + newAngle);

				Vector3 targetPosition = new Vector3(Mathf.Cos (conversion*newAngle), Mathf.Sin (conversion*newAngle), 0)*radius;

				Debug.DrawLine (Vector3.zero, transform.position, Color.green, 3f);
				Debug.DrawLine (Vector3.zero, targetPosition, Color.green, 3f);

				Debug.DrawLine(transform.position, targetPosition, Color.red, 3f);
				RandomPositioning = false;

				TravelTo (targetPosition);

			}
		}
	}

/*
	void Start () 
	{

		TravelTo (transform.position*(3.5f/transform.position.magnitude));
		//rigidbody2D.velocity = -transform.right;
		//rigidbody2D.angularVelocity = 15f;
		//Turn (new Vector2(3, 0));

		//CentreHinge.useMotor = true;

//		rigidbody2D.WakeUp ();


		//Armature.angularVelocity = 20f;
		//rigidbody2D.angularVelocity = 30f;
		//rigidbody2D.velocity = -transform.up*linearSpeed;
		//rigidbody2D.angularVelocity = -30;
	}
	*/
	// Update is called once per frame
	void Update () 
	{
		//rigidbody2D.AddForce(-transform.position*10);
		if(alive)
		{
			if(moving)
			{
				/*timeRemaining -= Time.deltaTime;
				angleTurned = (Time.time-startTime)*angularSpeed;

				if(angleTurned >= deltaAngle)
				{
					EndTravel ();
				}
	*/

				timeRemaining -= Time.deltaTime;

				if(timeRemaining < 0)
				{
					EndTravel();
				}

			}

			if(adjusting)
			{
				RaycastHit2D Left = Physics2D.Raycast(weaponSystems.LeftGun.position, -transform.up, 50f, targetingMask);
				RaycastHit2D Right = Physics2D.Raycast(weaponSystems.RightGun.position, -transform.up, 50f,  targetingMask);

				if(Left != false && Right!= false)
				{
					//Debug.Log ("Player in sights!");

					//Debug.Log ("Left sight: " + Left.transform.name);
					//Debug.Log ("Right sight: " + Right.transform.name);

					adjusting = false;

					weaponsOnline = true;
					weaponSystems.enabled = true;
					GetComponent<Rigidbody2D>().angularVelocity = 0f;
				}

			}

			if(weaponsOnline)
			{
				if(shotsFired > 2)
				{
					//Debug.Log ("Disabling weapons!");

					shotsFired = 0;
					weaponSystems.enabled = false;
					weaponsOnline = false;

					RandomMove();

				}
			}
		}
	}
}
