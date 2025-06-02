using UnityEngine;
using System.Collections;

public class shieldControls : MonoBehaviour {

	public BoxCollider2D hitBox;
	public ParticleEmitter emitter;
	public Rigidbody2D forceField;

	bool shieldsUp = false;

	bool shieldsReady = true;

	const float restoreTime = 5f; 

	public float timer;

	public int power = 3;

	float[] hitBoxWidth = {1.5f, 2.5f, 3.5f};
	int[] emissionMax = {10, 30 , 100};
	int[] emissionMin = {5, 10, 50};

	public bool ShieldsOn()
	{
		return shieldsUp;
	}

	void returnToCentre()
	{
		if(transform.localPosition  != Vector3.zero)
		{
			transform.localPosition = Vector2.zero;
		}
		
		forceField.angularVelocity = 0f;
	}

	public void shieldSwitch(bool On)
	{
		//Debug.Log ("Switching shields!");
		if(shieldsReady)
		{


			hitBox.enabled = On;
			emitter.emit = On;
			shieldsUp = On;

			if(!On)
			{
				//Debug.Log ("Timer to zero!");
				timer = 0;
				returnToCentre ();
				if(power == 0)
				{
					shieldsReady = false;
				}
			}
		}
	}

	void setShield(int newPower)
	{
		//Debug.Log ("Power Level: " + newPower);

		hitBox.size = new Vector3(hitBoxWidth[newPower-1], hitBox.size.y, 0f);
		emitter.maxEmission = emissionMax[newPower-1];
		emitter.minEmission = emissionMin[newPower-1];
	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		//Debug.Log ("Shield Hit!");

		power --;

		if( power > 0)
		{
			setShield(power);
		}
		else
		{
			//Debug.Log ("Shields offline!");

			power = 0;
			shieldSwitch(false);
		}

	}

	void Update()
	{
		//Debug.Log("Shields Up = " + shieldsUp + "\nPower = " + power);

		if(power < 3 && shieldsUp == false)
		{


			timer += Time.deltaTime;

			//Debug.Log ("Timer: " + timer);

			if(power == 0 && timer >= 2*restoreTime)
			{
				timer = 0;

				//Debug.Log ("Shields available!");

				shieldsReady = true;

				power ++;
				setShield(power);
			}
			else if(power != 0 && timer >= restoreTime)
			{
				//Debug.Log ("Boosting Shields! (Pre-boost power = " + power + ")");

				timer = 0;
				power ++;
				setShield (power);

			}


		}

	}




}
