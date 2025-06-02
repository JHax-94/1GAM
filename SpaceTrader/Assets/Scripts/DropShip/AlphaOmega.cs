using UnityEngine;
using System.Collections;

public class AlphaOmega : MonoBehaviour {

	public CampaignGUI campaignControls;

	public SpriteRenderer spriteControl;
	public dropShipControls Ship;

	public ParticleEmitter JimmyTheExploder;

	public float maxSafeVelocity = 1.5f;

	public int Fragility = 5;

	bool triggered = false;


	IEnumerator TimerDestroy()
	{
		for(int i = 0; i < 2; i ++)
		{
			if(i == 1)
			{
				if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
				{
					Destroy(transform.parent.parent.gameObject);
				}
				else
				{
					Application.LoadLevel("Menu");
				}

			}

			yield return new WaitForSeconds(3f);
		}
	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		Debug.Log ("Hit!");

		Debug.Log ("Hit velocity = " + Mathf.Abs(Hit.relativeVelocity.y));

		if(Mathf.Abs(Hit.relativeVelocity.y) > maxSafeVelocity && triggered == false && Hit.collider.transform.tag != "Sideboard")
		{
			triggered = true;

			Ship.HullStrength -= Mathf.RoundToInt(Hit.relativeVelocity.magnitude*Fragility);

			if(Ship.HullStrength <= 0)
			{
				Ship.HullStrength = 0;

				Debug.Log ("Big Badda Boom!");
				//spriteControl.enabled = false;
				Ship.Off();
				Ship.enabled = false;

				if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
				{
					campaignControls.StartCoroutine (campaignControls.DropFail ());

				}
				StartCoroutine(TimerDestroy());

				JimmyTheExploder.Emit ();
			}

		}
	}

	void OnCollisionExit2D(Collision2D Left)
	{
		triggered = false;
	}

	void Start()
	{
		if(PlayerPrefs.GetString ("GameType") == "CAMPAIGN")
		{
			campaignControls = GameObject.FindGameObjectWithTag("Galaxy").GetComponent<CampaignGUI>();
		}

	}
}
