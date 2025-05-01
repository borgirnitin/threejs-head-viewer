import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Home() {
  const containerRef = useRef()

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(ambientLight, directionalLight)

    const loader = new THREE.ObjectLoader()
    loader.load(
      'https://raw.githubusercontent.com/borgirnitin/Head/main/head-compress.json',
      function (obj) {
        obj.scale.set(1.5, 1.5, 1.5)
        scene.add(obj)

        const animate = () => {
          requestAnimationFrame(animate)
          obj.rotation.y += 0.005
          obj.rotation.x += 0.002
          renderer.render(scene, camera)
        }
        animate()
      },
      undefined,
      function (error) {
        console.error('Error loading model:', error)
      }
    )

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />
}
