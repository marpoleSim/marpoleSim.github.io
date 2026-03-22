---
layout: post
title: "rhoCentralFoam Soure Term Discussion"
date: 2026-03-21
---
### Semi-implicit Source

The *fvOptions* library in *OpenFOAM* provides a flexible way to add source terms to governing equations. These sources can represent, for example, heat addition to internal energy (like ignition, or electronic component heating), a species injection such as a pollutant source or fuel inejction, or momentum input such as a propeller.   

However, source terms can also make a computation unstable or even cause divergence. For that reason, implicit or semi-implicit scheme is often used.   

### Simple System

Consider a simple system without any source term:   

$$
\frac{dx}{dt}=0
$$  

The solution is trivial.    

$$
x=constant
$$  

Now suppose a source term is addded in the form    

$$
S(x)=S_u+S_p\cdot x
$$  

where $S_u$ is the independent or unaffected part, $S_px$ the proportional part with a scalar factor $S_p$. The system becomes  

$$
\frac{dx}{dt}=S_u+S_p\cdot x
$$   

$S_u$ has the same unit as $dx/dt$, and $S_p$ is scalar.   

If $S_u\gt 0$, then $x$ wil increase with time. So $S_u$ acts as a source. If $S_u \lt 0$, it is a sink. In some situations, this growth may become too rapid and lead to numerical instability. A negative $S_p$ can act like a damping. In this way, the proportional term helps stabilize the solution and prevents uncontrollable increase of x.   

### Momentum Source Term  

Froude's actuation disk theory provides the thrust formula    

$$
T=2\rho A |U_\infty \cdot n|^2 a (1-a)
$$

When using *fvOptions* with type *actuationDiskSource*, $S_u$ and $S_p$ are calculated internally via function $addSup$.    

$$
S_u=\frac{T}{V_{disk}}
$$   

This is added to the **RHS** of the velocity equation(*UEqn*). The proportional part doesn't have an explicit value unless the model includes velocity-dependent linearization. The solve may internally add a small value to stabilize the computation. 

### Issues with rhoCentralFoam

Unlike other solvers, *rhocentralFoam* solve $\rho U$ instead of $U$.  

For density-weighted momentum sourcs, a modified type, such as *rhoActuationDiskSource* is required. This variant calculates $\rho T$ instead of $T$, ensuring consistency with the solver's equation. 

