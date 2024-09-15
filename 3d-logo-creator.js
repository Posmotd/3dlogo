'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text3D, Center, Environment } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function Logo({ text, color, font }) {
  const mesh = useRef()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.z = 5
  }, [camera])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Center>
      <Text3D
        ref={mesh}
        font={`/fonts/${font}.json`}
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshPhongMaterial color={color} />
      </Text3D>
    </Center>
  )
}

export default function Component() {
  const [text, setText] = useState('3D Logo')
  const [color, setColor] = useState('#ffffff')
  const [font, setFont] = useState('Geist_Regular')

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Logo text={text} color={color} font={font} />
          <OrbitControls enablePan={false} />
          <Environment preset="studio" />
        </Canvas>
      </div>
      <div className="p-4 bg-background">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="text-input">Logo Text</Label>
            <Input
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter logo text"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="color-input">Color</Label>
            <Input
              id="color-input"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="font-select">Font</Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger id="font-select">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geist_Regular">Geist Regular</SelectItem>
                <SelectItem value="Geist_Bold">Geist Bold</SelectItem>
                <SelectItem value="Inter_Regular">Inter Regular</SelectItem>
                <SelectItem value="Inter_Bold">Inter Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}