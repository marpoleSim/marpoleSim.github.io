---
layout: post
title: "OpenFOAM v2413 Tutorial Cases Analysis (2)"
date: 2026-05-07
---
## Turbulence Models ##
Although the Navier-Stokes equations are well established for describing fluid motion and is solved by CFD (Computational Fluid Dynamics), when simulating turbulence flow, a random fluid motion driven by viscous shear, things become complicated. The computation cost of directly resolving turbulence becomes prohibitive using resources nowadays. 

Turbulence is the most critical topic in fluid mechanics and it exists almost in all engineering applications. It relates to momentum, heat and material transportation. Without accounting for turbulence effects, the computation results are off significantly. 

Due to limitiation in computation capability, the turbulence is mainly modelled, as turblence sub-model, instead of being directly computed. As it is still in research area, many turbulence sub-models exist. OpenFOAM is no exception. 

To develop turbulence sub-model, in the early years, the focus is mainly on closure of the following equations. 

$$
\frac{\partial(\rho \bar{u}_i)}{\partial x_i} =0
$$

$$
\frac{\partial(\rho \bar{u}_i)}{\partial t} + \frac{\partial}{\partial x_j}(\rho \bar{u}_i\bar{u}_j+\overline{\rho u_i'u_j'})=-\frac{\partial \bar{p}}{\partial x_i} + \frac{\partial \bar{\tau_{ij}}}{\partial x_j} 
$$

$$
\frac{\partial(\rho \bar{\phi})}{\partial t} + \frac{\partial}{\partial x_j}(\rho \bar{u}_j\bar{\phi}+\overline{\rho u_j'\phi'})=\frac{\partial}{\partial x_j}(\Gamma \frac{\partial \bar{\phi}}{\partial x_j})
$$

The Reyolds stress $\overline{\rho u_i'u_j'}$ and the turbulent scalar flux $\overline{\rho u_j'\phi'}$ in the conservation equations are not closed and need to be modelled. 

There are four classes of turbulence models: RANS (Reynolds-Averaged Navier-Stokes) model, which is to close the above equation, LES (Large Eddy Simulation), Hybrid DES (Detached Eddy Simulation) or SAS (Scale-Adaptive Simulation) and DNS model (Direct Numerical Simulation).

Still 90% of CFD simulations uses RANS model because it is simple, fast and low cost. But it cannot well predict separation flow. 

The table listed below the turbulence model used in the tutorial cases. For transient incompressible flow solver *pimpleFoam*, there is 18% cases using LES model. There are 37% cases laminar and 44% cases using RAS model. For other incompressible and compressible solver, either steady-state or transient, all turbulence model, turbulence model are 100% RAS. 

```python
simulationType       LES       RAS   laminar
application                                 
pimpleFoam      0.185185  0.444444  0.370370
rhoCentralFoam  0.000000  0.000000  1.000000
rhoPimpleFoam   0.000000  0.800000  0.200000
rhoSimpleFoam   0.000000  0.833333  0.166667
simpleFoam      0.000000  0.950000  0.050000
```

## RANS Models ##

Even for RANS Model, there are many versions. Mostly, the models were developed to fit the boundary layer measurment and/or theory. In OpenFOAM v2412, the data mining into the source code gives the following 23 turbulence sub-models. Just by the number of the submodels, we can see that, in this area, we haven't got a satisfied model. 

Among these model, the most used models k-epsilon two equation model, k-omega SST two equation model and Spalart-Allmaras single equation model. 

```
+-----------------------+---------------------------------------------------+
| LienLeschziner        | Lien and Leschziner low-Reynolds number k-epsilon |
|                       | turbulence model for incompressible flows.        |
+-----------------------+---------------------------------------------------+
| LamBremhorstKE        | Lam and Bremhorst low-Reynolds number k-epsilon   |
|                       | turbulence model for incompressible flows         |
+-----------------------+---------------------------------------------------+
| ShihQuadraticKE       | Shih's quadratic algebraic Reynolds stress        |
|                       | k-epsilon turbulence model for incompressible     |
|                       | flows                                             |
+-----------------------+---------------------------------------------------+
| LienCubicKE           | Lien cubic non-linear low-Reynolds k-epsilon      |
|                       | turbulence models for incompressible flows.       |
+-----------------------+---------------------------------------------------+
| kkLOmega              | Low Reynolds-number k-kl-omega turbulence model   |
|                       | for incompressible flows.                         |
+-----------------------+---------------------------------------------------+
| qZeta                 | Gibson and Dafa'Alla's q-zeta two-equation low-Re |
|                       | turbulence model for incompressible flows         |
+-----------------------+---------------------------------------------------+
| RNGkEpsilon           | Renormalization group k-epsilon turbulence model  |
|                       | for incompressible and compressible flows.        |
+-----------------------+---------------------------------------------------+
| kEpsilon              | Standard k-epsilon turbulence model for           |
|                       | incompressible and compressible flows including   |
|                       | rapid distortion theory (RDT) based compression   |
|                       | term.                                             |
+-----------------------+---------------------------------------------------+
| SSG                   | Speziale, Sarkar and Gatski Reynolds-stress       |
|                       | turbulence model for incompressible and           |
|                       | compressible flows.                               |
+-----------------------+---------------------------------------------------+
| kOmega                | Standard high Reynolds-number k-omega turbulence  |
|                       | model for incompressible and compressible flows.  |
+-----------------------+---------------------------------------------------+
| EBRSM                 | Manceau (2015)'s elliptic-blending Reynolds-      |
|                       | stress turbulence model for incompressible and    |
|                       | compressible flows.                               |
+-----------------------+---------------------------------------------------+
| kOmegaSST             | Implementation of the k-omega-SST turbulence      |
|                       | model for incompressible and compressible flows.  |
+-----------------------+---------------------------------------------------+
| LRR                   | Launder, Reece and Rodi Reynolds-stress           |
|                       | turbulence model for incompressible and           |
|                       | compressible flows.                               |
+-----------------------+---------------------------------------------------+
| kOmegaSSTLM           | Langtry-Menter 4-equation transitional SST model  |
|                       | based on the k-omega-SST RAS model.               |
+-----------------------+---------------------------------------------------+
| kEpsilonPhitF         | The k-epsilon-phit-f turbulence closure model for |
|                       | incompressible and compressible flows.            |
+-----------------------+---------------------------------------------------+
| realizableKE          | Realizable k-epsilon turbulence model for         |
|                       | incompressible and compressible flows.            |
+-----------------------+---------------------------------------------------+
| kOmegaSSTSAS          | Scale-adaptive URAS model based on the k-omega-   |
|                       | SST RAS model.                                    |
+-----------------------+---------------------------------------------------+
| SpalartAllmaras       | Spalart-Allmaras one-transport-equation linear-   |
|                       | eddy-viscosity turbulence closure model for       |
|                       | incompressible and compressible external flows.   |
+-----------------------+---------------------------------------------------+
| LaunderSharmaKE       | Launder and Sharma low-Reynolds k-epsilon         |
|                       | turbulence model for incompressible and           |
|                       | compressible and combusting flows including rapid |
|                       | distortion theory (RDT) based compression term.   |
+-----------------------+---------------------------------------------------+
| mixtureKEpsilon       | Mixture k-epsilon turbulence model for two-phase  |
|                       | gas-liquid systems                                |
+-----------------------+---------------------------------------------------+
| LaheyKEpsilon         | Continuous-phase k-epsilon model including        |
|                       | bubble-generated turbulence.                      |
+-----------------------+---------------------------------------------------+
| kOmegaSSTSato         | Implementation of the k-omega-SST turbulence      |
|                       | model for dispersed bubbly flows with Sato (1981) |
|                       | bubble induced turbulent viscosity model.         |
+-----------------------+---------------------------------------------------+
| continuousGasKEpsilon | k-epsilon model for the gas-phase in a two-phase  |
|                       | system supporting phase-inversion.                |
+-----------------------+---------------------------------------------------+
```

