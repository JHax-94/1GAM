using UnityEngine;
using System.Collections;

public class Exploder : MonoBehaviour
{

	public SpriteRenderer MINE_RENDER;
	public ParticleEmitter EXPLOSION;

	public void Reset()
	{
		EXPLOSION.emit = false;
		MINE_RENDER.enabled = true;

	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		if(Hit.collider.tag == "McFish")
		{
			MINE_RENDER.enabled = false;
			EXPLOSION.emit = true;

		}
	}
	/*
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}*/
}
