name: 🐛 Bug Report
description: Report a bug to help us improve
labels: [bug]

body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug!

  - type: textarea
    id: description
    attributes:
      label: Describe the bug
      placeholder: What went wrong?
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: 1. Go to... 2. Click... 3. See error...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      placeholder: What should happen?
    validations:
      required: true

  - type: input
    id: browser
    attributes:
      label: Browser
      placeholder: e.g., Chrome 120, Safari 17

  - type: input
    id: device
    attributes:
      label: Device
      placeholder: e.g., iPhone 15, MacBook Pro
