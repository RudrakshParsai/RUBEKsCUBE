# RuBEk's CUBE - IoT Orchestration Platform

A modular IoT orchestration platform MVP that allows users to create, simulate, and deploy smart device workflows through an intuitive drag-and-drop interface.

## 🚀 Features

### Core Functionality
- **Visual Workflow Editor**: Drag-and-drop canvas using React Flow for creating IoT workflows
- **Block Library**: Pre-built components for sensors, actuators, logic, and AI integration
- **Real-time Simulation**: Test workflows with mock data and interactive controls
- **Device Deployment**: Deploy workflows to mock RuBEk Cube devices
- **Live Monitoring**: Real-time dashboard with charts and alerts
- **AI Integration**: Text-to-sketch conversion and AI debugging assistant

### Block Types
- **Sensors**: Moisture, Temperature, PIR Motion, Light sensors
- **Actuators**: Water Pump, LED, Servo Motor, Fan
- **Logic**: If/Else, Timer, Threshold, AND/OR gates
- **AI**: Decision making and chat assistant

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Visual Editor**: React Flow
- **Charts**: Recharts
- **State Management**: Zustand
- **AI Integration**: OpenAI API (mock implementation)

## 📦 Installation

1. **Prerequisites**
   - Node.js 18+ 
   - npm or yarn

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd rubek-cube
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   
   # Add your OpenAI API key (optional for AI features)
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### 1. Dashboard
- View recent sketches and connected devices
- Quick access to create, simulate, deploy, and monitor
- Device status overview with real-time sensor data

### 2. Sketch Editor
- **Create Workflows**: Drag blocks from the left panel to the canvas
- **Connect Blocks**: Link inputs and outputs with color-coded connections
- **AI Assistant**: Use natural language to generate workflows
- **Simulation Mode**: Test workflows with interactive controls

### 3. Simulation
- **Sensor Controls**: Adjust moisture, temperature, light, and motion values
- **Actuator Testing**: Toggle pumps, LEDs, motors, and fans
- **Real-time Logs**: Monitor simulation events and data flow

### 4. Deployment
- **Deploy to Cube**: Send workflows to mock RuBEk Cube devices
- **Device Status**: Monitor connection and sensor readings
- **Deployment Logs**: Track deployment progress and status

### 5. Monitoring
- **Live Charts**: Real-time sensor data visualization
- **Alerts Panel**: System notifications and warnings
- **Device Overview**: Current sensor values and actuator states

## 🎨 Design Philosophy

- **Lego-like Blocks**: Colorful, rounded components that feel playful yet professional
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Color-coded Connections**: Blue (input), Green (output), Yellow (logic)

## 🔧 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── editor/            # Sketch editor page
│   ├── deploy/            # Deployment page
│   ├── monitoring/        # Monitoring dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BlockPanel.tsx     # Drag-and-drop block library
│   ├── CustomNode.tsx     # React Flow node component
│   ├── CustomEdge.tsx     # React Flow edge component
│   ├── AIPanel.tsx        # AI assistant interface
│   └── SimulationPanel.tsx # Simulation controls
├── data/                  # Static data and templates
│   └── blockTemplates.ts  # Block definitions
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
├── store/                 # State management
│   └── useStore.ts       # Zustand store
└── types/                 # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🚀 Getting Started Guide

### Creating Your First Workflow

1. **Start from Dashboard**
   - Click "Create New Sketch" or go to Editor
   - Give your sketch a name and description

2. **Add Sensor Blocks**
   - Drag a "Moisture Sensor" from the Sensors category
   - Add a "Temperature Sensor" for environmental monitoring

3. **Add Logic Blocks**
   - Drag a "Threshold" block to compare sensor values
   - Add an "If/Else" block for conditional logic

4. **Add Actuator Blocks**
   - Drag a "Water Pump" from the Actuators category
   - Add an "LED" for status indication

5. **Connect the Blocks**
   - Connect sensor outputs to logic inputs (blue to yellow)
   - Connect logic outputs to actuator inputs (yellow to green)

6. **Test with Simulation**
   - Click "Simulate" to test your workflow
   - Adjust sensor values and watch actuators respond

7. **Deploy to Device**
   - Go to the Deploy page
   - Click "Deploy to Cube" to send to mock device

8. **Monitor Results**
   - Check the Monitoring dashboard for live data
   - View charts and alerts for system status

### Example Workflow: Smart Irrigation

```
Moisture Sensor → Threshold (30%) → Timer (5s) → Water Pump
Temperature Sensor → Threshold (25°C) → Fan
```

This creates an automated irrigation system that waters plants when soil moisture drops below 30% and cools the environment when temperature rises above 25°C.

## 🔮 Future Enhancements

- **Real Device Integration**: Connect to actual RuBEk Cube hardware
- **Advanced AI**: GPT-4 integration for complex workflow generation
- **Collaboration**: Multi-user editing and sharing
- **Templates**: Pre-built workflow templates for common use cases
- **Analytics**: Advanced data analysis and insights
- **Mobile App**: Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Flow for the visual editor
- TailwindCSS for styling
- Framer Motion for animations
- Recharts for data visualization
- The RuBEk team for the IoT platform concept

---

**RuBEk's CUBE** - Making IoT accessible through visual programming! 🚀





"# RUBEKsCUBE" 
